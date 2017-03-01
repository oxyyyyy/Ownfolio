<?php

  /* Задаем переменные */

  $name = htmlspecialchars($_POST["name"]);
  $email = htmlspecialchars($_POST["email"]);
  $message = htmlspecialchars($_POST["message"]);
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
                  echo 'Sent!';}
  else {
                  echo 'Error.';}
?>
