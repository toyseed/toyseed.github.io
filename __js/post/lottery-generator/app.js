import historys from './lottery-history.json';

(_ => {
  const winningHistory = historys
    .map(history => history.nums.slice(0, 6))
    .reverse();

  _.addEventListener('load', _ => {
    const storage = window.localStorage;
    const storeKey = 'localHistory';
    const localHistory = JSON.parse(storage.getItem(storeKey) || '[]');

    const baseEl = document.querySelector('.lottery-generator');
    let gameCountEl = baseEl.querySelector('._game-count-value');
    let gameCount = parseInt(gameCountEl.innerText);
    let excludeWinningNums = false;
    let numsIncluded = [];
    let numsExcluded = [];

    // make nums included select area
    makeNumsIncludedLayer(baseEl);
    // make nums excluded select area
    makeNumsExcludedLayer(baseEl);
    // TODO: show local history
    showStat(baseEl);

    document
      .getElementById('game-count-range')
      .addEventListener('change', evt => {
        gameCount = parseInt(evt.target.value);
        gameCountEl.innerText = gameCount;
      });
    baseEl.addEventListener('click', evt => {
      const el = evt.target;
      if (hasClass(el, '_show-nums-included')) {
        // show nums included select area
        baseEl.querySelector('._nums-included-layer').style.display = 'flex';
      } else if (hasClass(el, '_show-nums-excluded')) {
        // show nums excluded select area
        baseEl.querySelector('._nums-excluded-layer').style.display = 'flex';
      } else if (hasClass(el, '_exclude-history')) {
        excludeWinningNums = el.checked;
      } else if (hasClass(el, '_generate')) {
        // generate lottery nums
        const nums = generateNums(
          gameCount,
          numsIncluded,
          numsExcluded,
          excludeWinningNums,
        );
        showGeneratedNums(nums);
        localHistory.push({ time: new Date().getTime(), nums: nums });
        while (localHistory.length > 300) {
          localHistory.shift();
        }
        storage.setItem(storeKey, JSON.stringify(localHistory));
        showGenerationHistory(baseEl, localHistory);
      } else if (hasClass(el, '_cancel-included')) {
        // hide
        baseEl.querySelector('._nums-included-layer').style.display = 'none';
      } else if (hasClass(el, '_confirm-included')) {
        let checkedEls = baseEl.querySelectorAll('._num-included:checked');
        numsIncluded = [];
        for (let i = 0; i < checkedEls.length; i++) {
          numsIncluded.push(parseInt(checkedEls[i].value));
        }
        baseEl.querySelector('._nums-included').innerText = numsIncluded.join(
          ',',
        );
        baseEl.querySelector('._nums-included-layer').style.display = 'none';
      } else if (hasClass(el, '_cancel-excluded')) {
        baseEl.querySelector('._nums-excluded-layer').style.display = 'none';
      } else if (hasClass(el, '_confirm-excluded')) {
        let checkedEls = baseEl.querySelectorAll('._num-excluded:checked');
        numsExcluded = [];
        for (let i = 0; i < checkedEls.length; i++) {
          numsExcluded.push(parseInt(checkedEls[i].value));
        }
        baseEl.querySelector('._nums-excluded').innerText = numsExcluded.join(
          ',',
        );
        baseEl.querySelector('._nums-excluded-layer').style.display = 'none';
      } else if (hasClass(el, '_show-winning-static')) {
        el.classList.add('selected');
        baseEl
          .querySelector('._show-generation-history')
          .classList.remove('selected');
        baseEl.querySelector('._winning-static').classList.remove('hide');
        baseEl.querySelector('._generation-history').classList.add('hide');
      } else if (hasClass(el, '_show-generation-history')) {
        el.classList.add('selected');
        baseEl
          .querySelector('._show-winning-static')
          .classList.remove('selected');
        baseEl.querySelector('._winning-static').classList.add('hide');
        baseEl.querySelector('._generation-history').classList.remove('hide');

        showGenerationHistory(baseEl, localHistory);
      }
    });
  });

  const showGenerationHistory = (baseEl, localHistory) => {
    let markup = [];
    markup.push('<ol>');
    for (let i = localHistory.length - 1; i >= 0; i--) {
      let hist = localHistory[i];
      let gDate = new Date(hist.time);
      let gNums = hist.nums;

      markup.push('<li>');
      markup.push(
        `<span>${gDate.getFullYear()}-${gDate.getMonth() + 1}-${gDate.getDate()} ${gDate.getHours()}:${gDate.getMinutes()}:${gDate.getSeconds()}</span>`,
      );
      markup.push('<ol>');
      for (let nums of gNums) {
        markup.push('<li>');
        for (let num of nums) {
          let color = ((num - 1) / 10) | 0;
          markup.push(
            `<span class="ball mini ball-color-${color}">${num}</span>`,
          );
        }
        let winedGame = winningHistory.containsAt(nums);
        if (winedGame > -1) {
          markup.push(`<span>${winedGame + 1}회 당첨번호</span>`);
        }
        markup.push('</li>');
      }
      markup.push('</ol>');
      markup.push('</li>');
    }
    markup.push('</ol>');

    baseEl.querySelector(
      '._generation-history .content',
    ).innerHTML = markup.join('');
  };

  const showStat = baseEl => {
    const byNum = [];
    const byColor = [];

    let maxNumCount = -1;
    let maxColorCount = -1;

    for (let history of winningHistory) {
      for (let num of history) {
        byNum[num] = (byNum[num] || 0) + 1;
        const color = ((num - 1) / 10) | 0;
        byColor[color] = (byColor[color] || 0) + 1;

        if (byNum[num] > maxNumCount) {
          maxNumCount = byNum[num];
        }

        if (byColor[color] > maxColorCount) {
          maxColorCount = byColor[color];
        }
      }
    }

    const byColorArea = baseEl.querySelector('._color-history');
    const byColorMarkup = [];
    byColorMarkup.push('<ol>');
    byColor.forEach((count, color) => {
      const height = ((count / maxColorCount) * 100) / 2;
      byColorMarkup.push(
        `<li><span class="ball mini ball-color-${color}">&nbsp;</span><span class="bar" style="height:${height}%">&nbsp;</span><span>${count}</span></span></li>`,
      );
    });
    byColorMarkup.push('</ol>');
    byColorArea.innerHTML = byColorMarkup.join('');

    const byNumArea = baseEl.querySelector('._num-history');
    const byNumMarkup = [];
    byNumMarkup.push('<ol>');
    byNum.forEach((count, num) => {
      const width = ((count / maxNumCount) * 100) / 2;
      const color = ((num - 1) / 10) | 0;
      byNumMarkup.push(
        `<li><span class="ball mini ball-color-${color}">${num}</span><span class="bar" style="width:${width}%">&nbsp;</span><span>${count}</span></span></li>`,
      );
    });
    byNumMarkup.push('</ol>');
    byNumArea.innerHTML = byNumMarkup.join('');
  };

  const generateNums = (count, includes = [], excludes = [], exceptHistory = false) => {
    const result = [];
    const base = includes.filter(include => excludes.indexOf(include) === -1);

    if (base.length >= 6) {
      for (let i = 0; i <= base.length - 6; i++) {
        let candidate = base.slice(i, i + 6);

        if (exceptHistory && !winningHistory.contains(candidate)) {
          result.push(base.slice(i, i + 6));
        }

        if (result.length === 10) {
          break;
        }
      }
    }

    if (result.length === 10) {
      return result;
    }

    let maxTry = 1000;
    while (result.length < count && maxTry > 0) {
      maxTry--;
      let seed = base.slice();
      while (seed.length < 6) {
        let num = randomLotteryNum();

        if (seed.contains(num) || excludes.contains(num)) {
          continue;
        }

        seed.push(num);
      }
      if (exceptHistory && winningHistory.contains(seed)) {
        console.log(`${seed} exists in the history`);
        continue;
      }

      let sorted = seed.sort();
      if (!result.contains(sorted)) {
        result.push(sorted);
      }
    }

    return result;
  };

  let randSeed = [];
  for (let i = 1; i <= 45; i++) {
    randSeed.push(i);
  }

  const randomLotteryNum = () => {
    const shuffle = Math.round(Math.random() * 8);
    for (let i = 0; i < shuffle; i++) {
      randSeed = randSeed.shuffled();
    }

    return randSeed[randSeed.length / 2 | 0];
  };

  const showGeneratedNums = nums => {
    const el = document.querySelector('._generated-nums');
    const markup = [];
    markup.push('<ol>');
    for (let num of nums) {
      markup.push('<li>');
      num = num.sort((a, b) => {
        return a - b;
      });
      for (let each of num) {
        const color = ((each - 1) / 10) | 0;
        markup.push(`<span class="ball ball-color-${color}">${each}</span>`);
      }
      markup.push('</li>');
    }
    markup.push('</ol>');
    el.innerHTML = markup.join('');
  };

  const makeNumsIncludedLayer = baseEl => {
    const layerMarkup = makeNumsLayer('included');
    baseEl.querySelector(
      '._nums-included-layer ._nums-area',
    ).innerHTML = layerMarkup;
  };

  const makeNumsExcludedLayer = baseEl => {
    const layerMarkup = makeNumsLayer('excluded');
    baseEl.querySelector(
      '._nums-excluded-layer ._nums-area',
    ).innerHTML = layerMarkup;
  };

  const makeNumsLayer = type => {
    const markup = [];
    markup.push('<ol>');
    for (let i = 1; i <= 45; i++) {
      markup.push(
        `<li><input type="checkbox" class="num-checkbox _num-${type}" id="num-${type}-${i}" value="${i}"><label for="num-${type}-${i}">${i}</label></li>`,
      );
    }
    markup.push('</ol>');
    return markup.join('');
  };

  const hasClass = (el, className) => {
    return el.classList.contains(className);
  };

  const generateStatByNum = function() {
    for (let index of historys) {
      console.log(index);
    }
  };

  const showStatByNum = function(statByNum) {};

  Array.prototype.shuffled = function() {
    let array = this.slice();
    let temp;

    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }

    return array;
  };

  Array.prototype.containsAt = function(item) {
    if (!item) {
      return -1;
    }

    if (item instanceof Array) {
      let findAt = -1;
      for (let i = 0; i < this.length; i++) {
        let value = this[i];
        if (!(value instanceof Array) || value.length !== item.length) {
          continue;
        }

        let allSame = true;
        for (let j = 0; j < item.length; j++) {
          if (!value.includes(item[j])) {
            allSame = false;
            break;
          }
        }

        if (allSame) {
          findAt = i;
          break;
        }
      }
      return findAt;
    } else {
      return this.indexOf(item);
    }
  };
  Array.prototype.contains = function(item) {
    if (!item) {
      return false;
    }

    if (item instanceof Array) {
      return (
        this.filter(src => {
          if (src instanceof Array) {
            if (src.length !== item.length) {
              return false;
            }

            let sortedSrc = src.sort();
            let sortedItem = item.sort();

            for (let i = 0; i < sortedSrc.length; i++) {
              if (sortedSrc[i] !== sortedItem[i]) {
                return false;
              }
            }
            return true;
          } else {
            return false;
          }
        }).length > 0
      );
    } else {
      return this.includes(item);
    }
  };
})(window);
