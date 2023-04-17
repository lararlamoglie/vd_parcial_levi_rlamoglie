// config. fecha español

d3.dsv(',', '147_desratizacion_.csv', d3.autoType).then(data => {
  console.log(data.length)

  let chart = Plot.plot({
    width:800,
    height:400,
    x: {
      domain: [1,11],
      
    },
    y: {
      domain: [    ]
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
      
    }
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})
