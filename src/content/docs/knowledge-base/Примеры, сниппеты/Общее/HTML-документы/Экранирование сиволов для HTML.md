---
title: Экранирование символов для вставки в html
slug: примеры-сниппеты-общее-html-документы/экранирование-символов-для-вставки-в-html
---

```bsl
Функция НормализованныйТекстДляHTML(Знач Текст)

	Текст = СтрЗаменить(Текст, "&", "&amp;");
	Текст = СтрЗаменить(Текст, "<", "&lt;");
	Текст = СтрЗаменить(Текст, ">", "&gt;");
	Текст = СтрЗаменить(Текст, """", "&quot;");
	Текст = СтрЗаменить(Текст, "'", "&#39;");
	
	Текст = СтрЗаменить(Текст, Символы.ПС, "<br>");
	Текст = СтрЗаменить(Текст, Символы.ВК, "<br>");
	Текст = СтрЗаменить(Текст, Символы.Таб, "    ");
	
	Возврат Текст;
	
КонецФункции
```