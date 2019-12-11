import React from "react";
import jQuery from 'jquery'
import '../assets/css/TravelStaistic.css'

export default function TravelStatistic() {
  (function($) {
    $.fn.countTo = function(options) {
      options = options || {};

      return $(this).each(function() {
        // set options for current element
        var settings = $.extend(
          {},
          $.fn.countTo.defaults,
          {
            from: $(this).data("from"),
            to: $(this).data("to"),
            speed: $(this).data("speed"),
            refreshInterval: $(this).data("refresh-interval"),
            decimals: $(this).data("decimals")
          },
          options
        );

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(settings.speed / settings.refreshInterval),
          increment = (settings.to - settings.from) / loops;

        // references & variables that will change with each update
        var self = this,
          $self = $(this),
          loopCount = 0,
          value = settings.from,
          data = $self.data("countTo") || {};

        $self.data("countTo", data);

        // if an existing interval can be found, clear it first
        if (data.interval) {
          clearInterval(data.interval);
        }
        data.interval = setInterval(updateTimer, settings.refreshInterval);

        // initialize the element with the starting value
        render(value);

        function updateTimer() {
          value += increment;
          loopCount++;

          render(value);

          if (typeof settings.onUpdate == "function") {
            settings.onUpdate.call(self, value);
          }

          if (loopCount >= loops) {
            // remove the interval
            $self.removeData("countTo");
            clearInterval(data.interval);
            value = settings.to;

            if (typeof settings.onComplete == "function") {
              settings.onComplete.call(self, value);
            }
          }
        }

        function render(value) {
          var formattedValue = settings.formatter.call(self, value, settings);
          $self.html(formattedValue);
        }
      });
    };

    $.fn.countTo.defaults = {
      from: 0, // the number the element should start at
      to: 0, // the number the element should end at
      speed: 1000, // how long it should take to count between the target numbers
      refreshInterval: 100, // how often the element should be updated
      decimals: 0, // the number of decimal places to show
      formatter: formatter, // handler for formatting the value before rendering
      onUpdate: null, // callback method for every time the element is updated
      onComplete: null // callback method for when the element finishes updating
    };

    function formatter(value, settings) {
      return value.toFixed(settings.decimals);
    }
  })(jQuery);

  jQuery(function($) {
    // custom formatting example
    $(".count-number").data("countToOptions", {
      formatter: function(value, options) {
        return value
          .toFixed(options.decimals)
          .replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
      }
    });

    // start all the timers
    $(".timer").each(count);

    function count(options) {
      var $this = $(this);
      options = $.extend({}, options || {}, $this.data("countToOptions") || {});
      $this.countTo(options);
    }
  });

  return   <div className="count-part m-5">
  

  <h1>Travel Statistical</h1>
  <h3>Stattistical about Viet Nam</h3>
  
  <div className="wrapper">
      <div className="counter col_fourth col-sm-6 col-md-4">
        <h2 className="timer count-title count-number" data-to="63" data-speed="1500">0</h2>
         <p className="count-text ">PROVINCE</p>
      </div>
  
      <div className="counter col_fourth col-sm-6 col-md-4">
        <h2 className="timer count-title count-number" data-to="2321" data-speed="1500">0</h2>
        <p className="count-text ">ISLANDS</p>
      </div>
  
      <div className="counter col_fourth col-sm-6 col-md-4">
        <h2 className="timer count-title count-number" data-to="13510237" data-speed="1500">0</h2>
        <p className="count-text ">TRAVELERS</p>
      </div>
  
      <div className="counter col_fourth end col-sm-6 col-md-4">
        <h2 className="timer count-title count-number" data-to="12159213" data-speed="1500">0</h2>
        <p className="count-text ">HAPPY CUSTOMER</p>
      </div>
  </div>
  </div>
}
