import $ from 'jquery';
import { combineLatest, fromEvent, merge, of, Subject } from 'rxjs';
import { map, reduce, switchMap, tap, throttleTime } from 'rxjs/operators';

$(document).ready(() => {
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

  const colorSubject$ = new Subject();
  colorSubject$.subscribe(color => showColor(color));
  colorSubject$.subscribe(color => showColorValue(color));

  of(redRange, greenRange, blueRange, opacityRange)
    .pipe(
      map(range =>
        merge(
          fromEvent(range, 'input').pipe(
            throttleTime(30),
            map(event => event.target.value),
          ),
          fromEvent(range, 'change').pipe(map(event => event.target.value)),
        ),
      ),
      reduce((acc, curr) => {
        acc.push(curr);
        return acc;
      }, []),
      switchMap(sources => combineLatest(sources)),
      map(([r, g, b, o]) => {
        return { r: +r, g: +g, b: +b, o: +o };
      }),
    )
    .subscribe(colorSubject$);

  // combineLastest 는 모든 observable 이 event emmit 되어야 값을 내보내기 시작한다.
  redRange.trigger({ type: 'input', target: redRange.get(0) });
  greenRange.trigger({ type: 'input', target: greenRange.get(0) });
  blueRange.trigger({ type: 'input', target: blueRange.get(0) });
  opacityRange.trigger({ type: 'input', target: opacityRange.get(0) });

  merge(
    fromEvent($('.js-click-hex'), 'click').pipe(
      map(() => $('.hex-color').text()),
    ),
    fromEvent($('.js-click-rgba'), 'click').pipe(
      map(() => $('.rgba-color').text()),
    ),
    fromEvent($('.js-color-pick'), 'click').pipe(
      map(event => $(event.target).css('background-color')),
    ),
  ).subscribe(text => {
    copyToClipboard(text);
    toastMessage(`'${text}' is copied on clipboard.`);
  });

  function showColor(color) {
    $('.color-box div').each(function() {
      const el = $(this);

      if (el.hasClass('e')) {
        return;
      }

      let red = el.hasClass('r') ? color.r : 0;
      let green = el.hasClass('g') ? color.g : 0;
      let blue = el.hasClass('b') ? color.b : 0;

      el.css('background-color', `rgba(${red}, ${green}, ${blue}, ${color.o}`);
    });
  }

  function showColorValue({ r, g, b, o }) {
    redView.text(r);
    greenView.text(g);
    blueView.text(b);
    opacityView.text(o);

    let hexValue =
      '#' +
      toHexValue(r) +
      toHexValue(g) +
      toHexValue(b) +
      toHexValue(Math.round(o * 255));

    let rgbaValue = `rgba(${r}, ${g}, ${b}, ${o})`;

    hexView.text(hexValue);
    rgbaView.text(rgbaValue);
  }

  function toHexValue(srcNum) {
    let num = +srcNum;
    let hexNum = (num + 0x100).toString(16).substr(-2);
    return hexNum;
  }

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
      width: '14em',
      transform: 'translateX(-50%)',
      borderRadius: '10px',
      padding: '1em 1.4em',
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
