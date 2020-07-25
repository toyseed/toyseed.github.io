import historys from './lottery-history.json';

(_ => {
  const winningHistory = historys.map(history => history.nums);

  _.addEventListener('load', _ => {
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
      }
    });
    // const statByNum = generateStatByNum();

    // showStatByNum(statByNum);
  });

  const generateNums = (count, includes, excludes, exceptHistory) => {
    const result = [];
    const base = includes.filter(include => excludes.indexOf(include) === -1);

    if (base.length >= 7) {
      for (let i = 0; i <= base.length - 7; i++) {
        let candidate = base.slice(i, i + 7);

        if (exceptHistory && !winningHistory.contains(candidate)) {
          result.push(base.slice(i, i + 7));
        }

        if (result.length === 10) {
          break;
        }
      }
    }

    if (result.length === 10) {
      return result;
    }

    while (result.length < count) {
      let seed = base.slice();
      while (seed.length < 7) {
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

  const randSeed = [];
  for (let i = 1; i <= 45; i++) {
    randSeed.push(i);
  }

  const randomLotteryNum = () => {
    let seed = randSeed.suffled();
    let index = Math.round(Math.random() * (seed.length - 1));

    return seed[index];
  };

  const showGeneratedNums = (nums) => {
    const el = document.querySelector('._generated-nums');
    const markup = [];
    markup.push('<ol>');
    for (let num of nums) {
      markup.push('<li>');
      num = num.sort((a, b) => {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      });
      for (let each of num) {
        let color = 'yellow';

        if (each >= 11 && each <= 20) {
          color = 'blue';
        } else if (each >= 21 && each <= 30) {
          color = 'red';
        } else if (each >= 31 && each <= 40) {
          color = 'black';
        } else if (each >= 41 && each <= 45) {
          color = 'green';
        }

        markup.push(`<span class="ball ball-color-${color}">${each}</span>`)
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

  Array.prototype.suffled = function() {
    let array = this.slice();
    let temp;

    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }

    return array;
  }

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
