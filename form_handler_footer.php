<?php

/* Задаем переменные */

$name = htmlspecialchars($_POST["name726"]);
$email = htmlspecialchars($_POST["email264"]);
$message = htmlspecialchars($_POST["message294"]);
$mail = "info@a-vlasenko.zzz.com.ua";

/* Ваш адрес и тема сообщения */

$address = "info@a-vlasenko.zzz.com.ua";
$sub = "Новая заявка на сайте a-vlasenko.zzz.com.ua";

/* Формат письма */

$mes = "Поступила новая заявка на сайте a-vlasenko.zzz.com.ua.\n
Страница: http://a-vlasenko.zzz.com.ua/
Клиента зовут: $name
E-mail клиента: $email
Сообщение клиента: $message";

/* Отправляем сообщение, используя mail() функцию */

$from = "From: $name <$mail> \r\n Reply-To: $mail \r\n";
if (mail($address, $sub, $mes, $from)) {
                header('Refresh:1; URL=http://a-vlasenko.zzz.com.ua/');
                echo 'Письмо отправлено, через секунду вы вернетесь на сайт';}
else {
                header('Refresh:1; URL=http://a-vlasenko.zzz.com.ua/');
                echo 'Письмо почему-то не отправлено, через секунду Вы вернетесь на сайт';}
?>
