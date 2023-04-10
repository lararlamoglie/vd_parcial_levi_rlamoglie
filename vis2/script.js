// config. fecha español
d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

d3.dsv(',', '147_desratizacion_.csv', d3.autoType).then(data => {
  //data = data.filter(d => ['Almagro', 'Balvanera', 'Boedo', 'Liniers', 'Monte Castro', 'Parque Chas', 'Recoleta', 'Villa Crespo', 'Villa Santa Rita', 'Caballito', 'Flores', 'Mataderos', 'Palermo', 'Pueyrredón', 'Urquiza', 'Flores', 'Parque Chacabuco', 'Villa del Parque',].includes(d.domicilio_barrio));
  console.log(data.length)

  let chart = Plot.plot({
    width: 400,
    height: 500,
    x: {
      domain: ["0-3","4-7", "8-11", "12-15", "16-19", "20-23"]
    },
    y:{
      domain: [0,900],
    },
    marks: [
      Plot.barY(data,
        Plot.binY(
          {y: 'count',},
          {
            x: 'hora_agrupada', thresholds: 10,
          },
        ),
      ),
      Plot.ruleY([0]),
    ],

  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})


