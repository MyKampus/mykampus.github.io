---
layout: about
title: Timeline 2024
permalink: timeline
---

Untuk periode 2024, timeline pendaftaran beasiswa dan kampus di US adalah sebagai berikut:

<div class="col-md-12">
    <table class="table">
        <thead>
            <tr>
                <th class="event-column">Event</th>
                <th class="date-column">Date</th>
            </tr>
        </thead>
        <tbody>
        {% for event in site.data.timeline.events %}
            <tr>
                <td>{{ event.name }}</td>
                <td>
                    {% assign date_parts = event.date | split: "-" %}
                    {% assign month_index = date_parts[1] | minus: 1 %}
                    {% assign day = date_parts[2] | plus: 0 %}
                    {% if day < 10 %}0{% endif %}{{ day }} {{ site.data.timeline.months_id[month_index] }} {{ date_parts[0] }}
                    {% if event.countdown %}
                        <span class="badge" id="countdown{{ forloop.index }}"></span>
                    {% endif %}
                </td>
            </tr>
        {% endfor %}
        </tbody>
    </table>
</div>
