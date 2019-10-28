import $ from 'jquery';

$(window).ready(() => {
  const redRange = $('.color-red .color-range');
  const greenRange = $('.color-green .color-range');
  const blueRange = $('.color-blue .color-range');
  const opacityRange = $('.opacity .opacity-range');

  const redView = $('.color-red .color-value');
  const greenView = $('.color-green .color-value');
  const blueView = $('.color-blue .color-value');
  const opacityView = $('.opacity .opacity-value');
  const hexView = $('.result .hex-color');
  const rgbaView = $('.result .rgba-color');

  let redValue = 255;
  let greenValue = 255;
  let blueValue = 255;
  let opacityValue = 1;

  redRange.value = redValue;
  greenRange.value = greenValue;
  blueRange.value = greenValue;
  opacityRange.value = opacityValue;

  onChange();

  let lastRed = new Date().getTime();
  redRange.on('input change', function() {
    const current = new Date().getTime();
    if (lastRed == null || current - lastRed > 50) {
      redValue = +this.value;
      onChange();
      lastRed = current;
    }
  });

  let lastGreen;
  greenRange.on('input change', function() {
    const current = new Date().getTime();
    if (lastGreen == null || current - lastGreen > 50) {
      greenValue = +this.value;
      onChange();
      lastGreen = current;
    }
  });

  let lastBlue;
  blueRange.on('input change', function() {
    const current = new Date().getTime();
    if (lastBlue == null || current - lastBlue > 50) {
      blueValue = +this.value;
      onChange();
      lastBlue = current;
    }
  });

  let lastOpacity;
  opacityRange.on('input change', function() {
    const current = new Date().getTime();
    if (lastOpacity == null || current - lastOpacity > 50) {
      opacityValue = +this.value;
      onChange();
      lastOpacity = current;
    }
  });

  function onChange() {
    setColor(redValue, greenValue, blueValue, opacityValue);
    redView.text(redValue);
    greenView.text(greenValue);
    blueView.text(blueValue);
    opacityView.text(opacityValue);

    let hexValue =
      '#' +
      toHexValue(redValue) +
      toHexValue(greenValue) +
      toHexValue(blueValue) +
      toHexValue(Math.round(opacityValue * 255));

    let rgbaValue = `rgba(${redValue}, ${greenValue}, ${blueValue}, ${opacityValue})`;

    hexView.text(hexValue);
    rgbaView.text(rgbaValue);
  }

  function toHexValue(srcNum) {
    let num = +srcNum;
    let hexNum = (num + 0x100).toString(16).substr(-2);
    return hexNum;
  }

  function setColor(r, g, b, opacity) {
    $('.color-box div').each(function() {
      const el = $(this);

      if (el.hasClass('e')) {
        return;
      }

      let red = el.hasClass('r') ? r : 0;
      let green = el.hasClass('g') ? g : 0;
      let blue = el.hasClass('b') ? b : 0;

      el.css('background-color', `rgba(${red}, ${green}, ${blue}, ${opacity}`);
    });
  }

  $('.js-click-hex').on('click', function() {
    const value = $('.hex-color').text();
    copyToClipboard(value);
    toastMessage(`'${value}' is copied to clipboard`);
  });

  $('.js-click-rgba').on('click', function() {
    const value = $('.rgba-color').text();
    copyToClipboard(value);
    toastMessage(`'${value}' is copied to clipboard`);
  });

  $('.js-color-pick').on('click', function(event) {
    const bgColor = $(event.target).css('background-color');
    copyToClipboard(bgColor);
    toastMessage(`'${bgColor}' is copied to clipboard.`);
  });

  function copyToClipboard(text) {
    const textarea = $('<textarea />');
    textarea.val(text);
    textarea.css({
      readonly: true,
      position: 'absolute',
      left: '-9999px',
    });

    $('body').append(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }

  function toastMessage(text) {
    const el = $(`<div>${text}</div>`);
    el.css({
      position: 'fixed',
      bottom: '2em',
      left: '50%',
      transform: 'translateX(-50%)',
      height: '4em',
      borderRadius: '10px',
      lineHeight: '4em',
      padding: '0 1.4em',
      backgroundColor: 'gray',
      color: 'white',
      opacity: '0',
    });

    $('body').append(el);
    new Promise(resolve => {
      el.animate(
        {
          opacity: 1,
        },
        '200ms',
        resolve,
      );
    })
      .then(() => {
        return new Promise(resolve => setTimeout(resolve, 2000));
      })
      .then(() => {
        return new Promise(resolve => {
          el.animate(
            {
              opacity: 0,
            },
            '200ms',
            resolve,
          );
        });
      })
      .then(() => {
        el.remove();
      });
  }
});
