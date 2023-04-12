// config. fecha español
d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

d3.dsv(',', '147_desratizacion_.csv', d3.autoType).then(data => {
  data = data.filter(d => ['Balvanera', 'Palermo', 'Saavedra',].includes(d.domicilio_barrio));
  console.log(data.length)

  let chart = Plot.plot({
    width: 1000,
    height: 500,
    marginLeft: 80,
    marginRight: 100,
    y: {
      label: "",
    },
    x:{
      domain: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    marks: [
      Plot.barY(data,
        Plot.binY(
          {y: 'count',},
          {
            x: 'dia_sem',
            fill: "domicilio_barrio",
          },
        ),
      ),
      Plot.ruleY([0]),
    ],

  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})


