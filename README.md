# React + TypeScript + Vite
# PRUEBA TECNICA FRONT

1. Desarrollar un login:

Debe permitir a los usuarios registrarse.
Los usuarios deben poder iniciar sesión.
Los usuarios deben poder cerrar sesión.

2. Procesamiento y visualización de datos:

Se le proporcionará un conjunto de datos extraídos de las redes sociales que deberá procesar.
Deberá utilizar la API-key de HuggingFace para el procesamiento y clasificación de los datos para obtener el sentimiento y emoción. Queremos ver cómo puede aplicar estos modelos para procesar y presentar información relevante de los datos. Además de manejar los errores que se puedan presentar al momento de procesar los datos con esta API (Es una API libre por lo que tiene tiempos de espera) .
El procesamiento de los datos debe ser en tiempo real, no debe procesar los datos fuera de la aplicación, y el procesamiento debe ser de manera asíncrona, el usuario no debe ver la pantalla en "negro" mientras se procesan los datos, se debe ir mostrando otro tipo de información mientras termina el procesamiento. Por ejemplo, el sentimiento, emociones, etc.
Visualizar los resultados (Cantidad de reacciones por "likes", "comments", "shares", cantidad de mensajes por sentimient, etc.).


## Requisitos

- Node.js
- npm (o yarn)

## Instalación

1. Clona este repositorio:
2.Instala las dependencias:
npm install
Inicia la aplicación:
npm run dev
