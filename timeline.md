---
layout: about
title: Timeline 2024
permalink: timeline
description: Timeline pendaftaran beasiswa dan kampus untuk periode 2024/2025. Lihat jadwal pendaftaran kampus dan beasiswa terkini di Amerika Serikat.
image: /assets/img/sand-clock-timer.svg
---

Untuk periode 2024/2025, timeline pendaftaran beasiswa dan kampus adalah di bawah ini. Jadwal ini akan diperbarui secara berkala. Jangan lupa untuk bookmark halaman ini dan kembali lagi untuk melihat update terbaru. Anda bisa juga menggunakan [aplikasi planner MyKampus](/planner) untuk merencanakan langkah-langkah menuju kampus impian Anda di Amerika Serikat.

<div class="col-md-12">
    <table class="table">
        <thead>
            <tr>
                <th class="event-column">Program</th>
                <th>Jenis</th>
                <th class="date-column">Deadline</th>
            </tr>
        </thead>
        <tbody>
        {% for event in site.data.timeline.events %}
            <tr>
                <td>
                    {% if event.type == "kampus" %}<img class="campus-icon" src="assets/icons/{{ event.school }}.ico">{% endif %}<a href="{{ event.web }}">{{ event.name }}</a></td>
                <td>
                {% if event.type == "beasiswa" %}<span class="badge-beasiswa">{% else %}<span class="badge-kampus">{% endif %}{{ event.type }}</span></td>
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
