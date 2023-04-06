// config. fecha español
d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

d3.dsv(',', '147_desratizacion_.csv', d3.autoType).then(data => {
  console.log(data.length)

  let chart = Plot.plot({
    width:800,
    height:400,
    x: {
      domain: [1,11],
      tickFormat: d => d3.timeFormat('%B')(new Date(2021, d - 1, 1))
    },
    y: {
      domain: [-50,900]
    },
    marks: [
      Plot.line(data, Plot.binY({y: "count"},{
        x: "mes_prestacion",
        //stroke: "estacion",
        strokeWidth: 2,
        stroke: "#909090"
      })),
      Plot.dot(data, Plot.binY({y: "count"},{
        x: "mes_prestacion",
        fill: "estacion",
        r:5,
      }))
    ],
    color:{
      range: ["#8A87DA","#DF893E","#A6E49D","#F6FF9A"]
    }
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})
