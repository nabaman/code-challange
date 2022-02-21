# code-challange
pada code challange ini saya menggunakan beberapa teknologi, yaitu
- DOCKER untuk Kontainer
- DJANGO untuk Backend
- REACT untuk Frontend
- CELERY untuk Task Queue
- DJANGO Channels untuk Websocket
- NGINX untuk Proxy

saya menggunakan docker sebagai kontainer karena memudahkan dalam proses development. dengan docker kita bisa mengisolasi apps sehingga lebih mudah untuk memodifikasi dan memperbarui program yang ada

diluar kelebihan django dan react, saya menggunakan 2 teknologi ini karena inilah teknologi yang paling saya kuasai dari pilihan penggunaaan teknologi yang ada

saya menggunakan celery sebagai task queue untuk melakukan tugas penghitungan rating di latar belakang. dengan asumsi banyaknya perhitungan yang dilakukan, dapat membuat request lebih lama di proses,
agar mempercepat proses. maka perhitungan harus di lakukan di latar belakang. celery saya gunakan untuk melakukan penghitungan rating dan mengirim response ke front end melalui websocket

django channels saya gunakan untuk memproses tuntutan agar apikasi berjalan secara realtime. django channels sendiri adalah modul untuk mengintegrasikan teknologi websocket pada django

karena dalam container memiliki berbagai jenis apps. nginx dibutuhkan untuk memproxy apps tersebut agar dapat di akses oleh 1 host yang sama.

untuk kedepannya saya ingin mengimplementasikan :
- caching mecanism
- load balancer
- SSL
- Authentication 


untuk menghindari error,
tolong kunjungi link native django terlebih dahulu,
jika sudah terlanjur error, hapus folder data, lalu build ulang.

untuk menjalankan pastikan sudah terinstall docker dan docker compose
docker-compose -f docker-compose-dev.yml up --build

testing deployment
link native django <br />
http://3.0.61.254/product <br />
http://localhost/product

link with front end <br />
http://3.0.61.254/ <br />
http://localhost/


