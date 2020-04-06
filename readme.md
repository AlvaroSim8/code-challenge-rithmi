# Prueba técnica Rithmi

## Instalación y librerías usadas

```
npm install expo-cli --global
git clone https://github.com/AlvaroSim8/code-challenge-rithmi
cd code-challenge-rithmi
npm install
```

## Arrancar proyecto

```
npm run ios
```

Por sencillez y dado que utilizo mac solo se ha probado en iOS, para probar en Android habría que seguir los siguientes pasos: https://docs.expo.io/versions/latest/workflow/android-studio-emulator/

## Realización

El punto de entrada a la aplicación es App.js y después se han separado los componentes de Logo, Item y Chart.
En logo he incorporado la imagen de la empresa.
Item se encarga de pintar cada uno de los elementos de la lista
Y Para hacer el gráfico de línea he utilizado la librería de [react-native-chart-kit](https://github.com/indiespirit/react-native-chart-kit), en la que he utilizado el gráfico LineChart con la estructura de datos que necesitaba la librería. El gráfico hace scroll a la derecha ya que al ser tantas fechas y horarios se juntaban unas con otras.

He utilizado la SectionList en el App.js en la cuál he modificado los estilos, utilizando la librería date-fns para darle el formato deseado a las fechas y para cambiar el idioma.

Dentro de App.js en la función getData() es donde se encuentra la lógica de la prueba, donde hago la llamada a la api con el fetch, la convierto a json en la promesa y esto me devuelve otra promesa en la cual:
Primero utilizo el método sort() para ordenar las fechas de menor a mayor.
También creo una variable llamada dataLength para poder facilitar obtener los datos de manera contraria, de más antiguo a más nuevo (para el gráfico).

Mediante un bucle for se recorre todo el array de fechas, y utilizo el método split() para separar la fecha de la hora para así empezar a agrupar las fechas en el objeto vacío que he declarado arriba. Con el método push() también hago lo mismo para el gráfico con las fechas ordenadas de forma contraria y meto por un lado las fechas en el labels y por otro las ppm en el datasets.

En dataFinal con el método Object.entries() doy la estructura que requiere SectionList. Por un lado el title que contiene la fecha completa y por otro él data, que va a contener el resto de información.

En el render() también he incluido las posibilidades de loading y error.
Las cuáles me muestran una pantalla distinta en el caso de que se encuentre cargando o de que en la aplicación haya algún error. Al loading me ha parecido una buena idea incluirle un setTimeout de un segundo, ya que esa primera pantalla de bienvenida aparecía como un flash y no daba tiempo a visualizar nada.

Este ha sido el resultado final:

![screenshot](/resultado-final.png?raw=true)

espero que os guste y un saludo!