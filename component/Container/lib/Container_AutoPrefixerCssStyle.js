/**
 * [description]
 * @Author   liyang
 * @mail     ly20479293@gmail.com
 * @DateTime 2017-03-31T11:59:34+0800
 * 
 * @example
 * AutoprefixerCssStyle({string}cssName, {string}cssValue)
 * AutoprefixerCssStyle('transition', 'width 1s')
 * 
 * @return   {string} style
 */
;Container.set('AutoprefixerCssStyle', function() {
    var style_transition = '-webkit-transition: @{{value}};\
                                 -moz-transition: @{{value}};\
                                 -mos-transition: @{{value}};\
                                   -o-transition: @{{value}};\
                                      transition: @{{value}};';

    var transition_duration = '-webkit-transition-duration: @{{value}};\
                        -moz-transition-duration: @{{value}};\
                        -mos-transition-duration: @{{value}};\
                          -o-transition-duration: @{{value}};\
                             transition-duration: @{{value}};';

    var style_transform = '-webkit-transform: @{{value}};\
                    -moz-transform: @{{value}};\
                    -mos-transform: @{{value}};\
                      -o-transform: @{{value}};\
                         transform: @{{value}};';
    var style = {
        'transition': style_transition,
        'transition-duration': transition_duration,
        'transform': style_transform
    }
    return function(cssName, value) {
        return style[cssName].replace(/\s/g, '').replace(/@\{\{value\}\}/g, value);
    }
});