// config. fecha español
d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

d3.dsv(',', '147_desratizacion_act.csv', d3.autoType).then(data => {
  data = data.filter(d => ['BALVANERA', 'PALERMO', 'SAAVEDRA',].includes(d.domicilio_barrio));
  data = data.filter(d => ['LIMPIEZA Y RECOLECCIÓN'].includes(d.categoria));
 

  const dayOfWeekMap = {
    'Monday': 1,
    'Tueday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6,
    'Sunday': 7
  };

  console.log(data.length)

  let chart = Plot.plot({
    width:1000,
    height:400,
    x: {
      //domain: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec" ],
      //tickFormat: d => d3.timeFormat('%B')(new Date(2021, d - 1, 1))
      label: "Mes",
      //tickFormat: d3.utcFormat("%b"),
    },
    y: {
      domain: [0,40],
      label: "",
    },
    
    marks: [
      Plot.line(data, Plot.binY({y: "count"},{
        x: "mes_prestacion",
        //x: d => d3.utcFormat("%b")(new Date(d.fecha_ingreso)),
        stroke: "domicilio_barrio",
        strokeWidth: 2,
        z: "domicilio_barrio",
        curve: "catmull-rom",
      })),
      Plot.dot(data, Plot.binY({y: "count"},{
        x: "mes_prestacion",
        //x: d => d3.utcFormat("%b")(new Date(d.fecha_ingreso)),
        z: "domicilio_barrio",
        fill: "domicilio_barrio",
        r:5,
      })),
      Plot.ruleY([0])
    ],
    color:{
    }
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#vis_1').append(() => chart)
})
