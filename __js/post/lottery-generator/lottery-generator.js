import historys from './lottery-history.json';
import { rando } from '@nastyox/rando.js';

(_ => {
  // const winningHistory = historys
  //   .map(history => history.nums.slice(0, 6))
  //   .reverse();

  // const winningNumbers = historys.map(history => {
  //   return {
  //     numbers: history.nums.slice(0, 6),
  //     bonusNumber: history.nums[6]
  //   };
  // }).reverse();
  //
  const lotteryHistory = {
    winningNumbers: historys
      .map(history => {
        return {
          numbers: history.nums.slice(0, 6),
          bonusNumber: history.nums[6],
        };
      })
      .reverse(),
    hasWonFirst: function(nums) {
      for (let winningNumber of this.winningNumbers) {
        if (winningNumber.numbers.contains(nums)) {
          return true;
        }
      }
      return false;
    },
    findBestMatch: function(nums) {
      let match = { match: false, game: -1, grade: 999, count: 0};

      for (let [index, winningNumber] of this.winningNumbers.entries()) {
        let count = winningNumber.numbers.matchCount(nums);
        if (count < 3) {
          continue;
        } else {
          match.match = true;
          match.count += 1;
        }

        let grade = -1;
        if (count === 6) {
          grade = 1;
        } else if (count === 5) {
          if (nums.indexOf(winningNumber.bonusNumber) > -1) {
            grade = 2;
          } else {
            grade = 3;
          }
        } else if (count === 4) {
          grade = 4;
        } else {
          grade = 5;
        }

        if (match.grade >= grade) {
          match.game = index + 1;
          match.grade = grade;
        }
      }

      return match;
    },
  };

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
    // show local history
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
        showGeneratedNumsStat(nums);
        localHistory.push({ time: new Date().getTime(), nums: nums });
        while (localHistory.length > 100) {
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
        `<span>${gDate.getFullYear()}-${gDate.getMonth() +
          1}-${gDate.getDate()} ${gDate.getHours()}:${gDate.getMinutes()}:${gDate.getSeconds()}</span>`,
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
        let winedGame = lotteryHistory.findBestMatch(nums);
        if (winedGame.match) {
          markup.push(`<span>${winedGame.game} / ${winedGame.grade} / ${winedGame.count}</span>`);
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

    for (let { nums: history } of historys) {
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

  const generateNums = (
    count,
    includes = [],
    excludes = [],
    exceptHistory = false,
  ) => {
    const result = [];
    const base = includes.filter(include => excludes.indexOf(include) === -1);

    if (base.length >= 6) {
      for (let i = 0; i <= base.length - 6; i++) {
        let candidate = base.slice(i, i + 6);

        if (exceptHistory && !lotteryHistory.hasWonFirst(candidate)) {
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
      if (exceptHistory && lotteryHistory.hasWonFirst(seed)) {
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
    if (Math.round(Math.random()) === 0) {
      const shuffle = Math.round(Math.random() * 8);
      for (let i = 0; i < shuffle; i++) {
        randSeed = randSeed.shuffled();
      }

      return randSeed[(randSeed.length / 2) | 0];
    } else {
      return rando(1, 45);
    }
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

  const showGeneratedNumsStat = nums => {
    const el = document.querySelector('._generated-nums');
    const numStat = new Array(45);
    numStat.fill(0, 0, 45);

    for (let num of nums) {
      for (let each of num) {
        numStat[each - 1] += 1;
      }
    }

    const colorStat = new Array(5);
    colorStat.fill(0, 0);

    for (const [i, v] of numStat.entries()) {
      colorStat[(i / 10) | 0] += v;
    }

    const colorStatMarkup = [];
    colorStatMarkup.push('<ol>');
    for (const [i, v] of colorStat.entries()) {
      colorStatMarkup.push(
        `<li><span class="ball mini ball-color-${i}"></span><span>${v}</span></li>`,
      );
    }
    colorStatMarkup.push('</ol>');
    document.querySelector('._stat-color').innerHTML = colorStatMarkup.join('');

    const numStatMarkup = [];
    numStatMarkup.push('<ol>');
    for (const [i, v] of numStat.entries()) {
      let color = (i / 10) | 0;
      numStatMarkup.push(
        `<li class="${
          v === 0 ? 'no-value' : ''
        }"><span class="ball mini ball-color-${color}">${i +
          1}</span><span>${v}</span></li>`,
      );
    }
    numStatMarkup.push('</ol>');
    document.querySelector('._stat-num').innerHTML = numStatMarkup.join('');
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

  Array.prototype.matchCount = function(item) {
    if (!item || !(item instanceof Array)) {
      return 0;
    }

    let matchCount = 0;
    for (let thisNum of this) {
      if (item.indexOf(thisNum) > -1) {
        matchCount++;
      }
    }

    return matchCount;
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

  // console.log(lotteryHistory.findBestMatch([3, 5, 12, 13, 33, 39]));
  // console.log(lotteryHistory.findBestMatch([3, 5, 12, 13, 33, 38]));
  // console.log(lotteryHistory.findBestMatch([3, 5, 12, 13, 33]));
  // console.log(lotteryHistory.findBestMatch([12, 13, 33, 39]));
  // console.log(lotteryHistory.findBestMatch([3, 5, 12]));
})(window);
