function updateCountdown() {
        var now = new Date().getTime();
        var deadlines = [
            {% for event in site.data.timeline.events %}
                {% if event.countdown %}
                    new Date("{{ event.date }}T23:59:59Z").getTime(),
                {% endif %}
            {% endfor %}
        ];

        var countdownElements = document.querySelectorAll('[id^="countdown"]');
        countdownElements.forEach((element, index) => {
            var distance = deadlines[index] - now;

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            element.innerHTML = distance > 0 ? 
                days + "h " + hours + "j " + minutes + "m " + seconds + "s " :
                "EXPIRED";
        });
    }

setInterval(updateCountdown, 1000);
