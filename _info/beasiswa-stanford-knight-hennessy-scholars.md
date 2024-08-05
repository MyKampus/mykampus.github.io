---
layout: about
title: Beasiswa Stanford Knight-Hennessy Scholars (KHS)
permalink: info/beasiswa-stanford-knight-hennessy-scholars
category: info
# featured_img: /assets/img/knight-hennessy-scholars.jpeg
# featured_img_position: center
description: Informasi tentang program Knight-Hennessy Scholars di Stanford University, termasuk keunggulan program, cara aplikasi, dan persyaratan untuk mendaftar.
image: /assets/img/khs-thumbnail.jpeg
---

## Knight-Hennessy Scholars (KHS): Peluang Beasiswa Global di Stanford

Program Knight-Hennessy Scholars (KHS) di Stanford University menawarkan kesempatan luar biasa bagi lulusan baru dan profesional berpengalaman untuk mengembangkan kepemimpinan global mereka melalui beasiswa penuh yang komprehensif. Dikenal karena pendekatannya yang inovatif dalam pendidikan pascasarjana, KHS memberikan dukungan yang mendalam kepada para scholar-nya, termasuk beasiswa, pelatihan kepemimpinan, dan kesempatan untuk berkolaborasi dengan akademisi dan profesional terkemuka di seluruh dunia.

### Keunggulan Program

1. **Beasiswa**: KHS menyediakan dukungan finansial penuh untuk seluruh biaya kuliah dan biaya hidup selama program studi di Stanford, memungkinkan para scholar untuk fokus sepenuhnya pada studi dan pengembangan diri mereka tanpa beban finansial.

2. **Pelatihan Kepemimpinan**: Para scholar akan terlibat dalam pelatihan kepemimpinan yang intensif dan program pengembangan diri yang dirancang untuk mempersiapkan mereka sebagai pemimpin yang efektif di berbagai sektor.

3. **Jaringan Global**: KHS memberikan akses kepada para scholar untuk bergabung dengan komunitas global yang luas dari para pemimpin dan inovator yang berpengaruh. Jaringan ini memberikan peluang kolaborasi dan pertukaran ide yang tak ternilai.

4. **Kesempatan Kolaborasi**: Scholar memiliki kesempatan untuk bekerja sama dengan fakultas Stanford, peneliti terkemuka, dan mitra industri dalam proyek-proyek inovatif yang dapat memperluas wawasan dan pengalaman mereka.


### Komponen Beasiswa
Knight-Hennessy Scholars menerima pendanaan hingga tiga tahun untuk program pascasarjana di Stanford. Pendanaan ini mencakup:

- **Beasiswa** untuk menutupi biaya kuliah dan biaya terkait.
- **Stipendia** untuk biaya hidup dan akademik (termasuk tempat tinggal, buku, perlengkapan akademik, bahan ajar, transportasi lokal, dan pengeluaran pribadi yang wajar).
- **Stipendia perjalanan** untuk tiket kelas ekonomi untuk satu perjalanan tahunan ke dan dari Stanford.
- **Stipendia relokasi** untuk scholar yang baru bergabung, membantu biaya pindah ke area dan pembelian teknologi.
- **Pendanaan tambahan** untuk kegiatan pengayaan akademik, seperti perjalanan konferensi, bagi scholar tahun kedua dan ketiga.

Pendanaan ini berlaku untuk program gelar yang tercantum dalam surat penerimaan KHS awal. Scholar yang ingin mendaftar ke program pascasarjana tambahan dapat mengajukan permohonan untuk pendanaan tambahan, dengan batas maksimum tiga tahun. Namun, pendanaan tambahan tidak dijamin. Jika scholar diterima di program gelar yang melebihi tiga tahun, seperti MD, PhD, atau program gelar ganda atau gabungan Stanford, pendanaan didasarkan pada komitmen pendanaan standar program gelar tersebut.

### Persyaratan Aplikasi

Untuk mendaftar ke program KHS, para calon harus memenuhi dua syarat utama:

1. **Gelar Sarjana**: Calon harus memiliki gelar sarjana dari universitas terakreditasi, dengan catatan akademik yang kuat, **setelah tahun 2018**.


2. **Stanford status**: Pendaftar harus sedang mendaftar atau berstatus mahasiswa aktif program pascasarjana di Stanford.

### Cara Mendaftar

1. **Persiapkan Dokumen**: Siapkan transkrip akademik, CV, esai, dan surat rekomendasi sesuai dengan panduan yang ditentukan di situs resmi KHS.

2. **Ajukan Aplikasi**: Lengkapi dan kirimkan aplikasi secara online melalui portal pendaftaran Stanford.

3. **Wawancara**: Jika diterima dalam seleksi awal, calon akan diundang untuk wawancara sebagai bagian dari proses seleksi akhir.

### Info lebih lanjut

Untuk informasi lebih lanjut terkait beasiswa KHS, silakan kunjungi:
- [lihat poster informasi beasiswa KHS 2024](https://knight-hennessy.stanford.edu/sites/g/files/sbiybj23586/files/media/file/khsoverview_2024_v6.pdf)
- [demografi awardee KHS tahun sebelumnya](https://knight-hennessy.stanford.edu/sites/g/files/sbiybj23586/files/media/file/khs_2024_cohort_ataglance_v4.pdf)
- jadwal [sesi informasi beasiswa KHS](https://apply.knight-hennessy.stanford.edu/portal/admission-events)
- [situs resmi Knight-Hennessy Scholars](https://knight-hennessy.stanford.edu)

### Timeline

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
            {% if event.name == "Stanford Knight-Hennessy Scholars (KHS)" %}
            <tr>
                <td>
                    {% if event.type == "kampus" %}<img class="campus-icon" src="../assets/icons/{{ event.school }}.ico">{% endif %}<a href="{{ event.web }}">{{ event.name }}</a></td>
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
            {% endif %}
        {% endfor %}
        </tbody>
    </table>
</div>

Tim MyKampus siap membantumu menyiapkan dokumen untuk mendaftar program di Stanford, sekaligus mendaftar beasiswa KHS ini. [Hubungi tim MyKampus](../kontak) untuk konsultasi layanan yang tersedia.