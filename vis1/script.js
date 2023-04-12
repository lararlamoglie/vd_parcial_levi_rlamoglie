// config. fecha español
d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

d3.dsv(',', '147_desratizacion_.csv', d3.autoType).then(data => {
  data = data.filter(d => ['Balvanera', 'Palermo', 'Saavedra',].includes(d.domicilio_barrio));
  console.log(data.length)

  let chart = Plot.plot({
    width:800,
    height:400,
    x: {
      domain: [1,11],
      tickFormat: d => d3.timeFormat('%B')(new Date(2021, d - 1, 1))
    },
    y: {
      domain: [0,60]
    },
    
    marks: [
      Plot.line(data, Plot.binY({y: "count"},{
        x: "mes_prestacion",
        stroke: "domicilio_barrio",
        strokeWidth: 2,
        z: "domicilio_barrio",
        curve: "catmull-rom",
      })),
      Plot.dot(data, Plot.binY({y: "count"},{
        x: "mes_prestacion",
        z: "domicilio_barrio",
        fill: "domicilio_barrio",
        r:5,
      }))
    ],
    color:{
    }
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})
