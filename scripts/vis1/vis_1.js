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
      //domain: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ]
      //tickFormat: d => d3.timeFormat('%B')(new Date(2021, d - 1, 1))
    },
    y: {
      label: "Solicitudes de desratización",
      labelOffset: 90,
      domain: [0,30],
     
      
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
    },

    style:{
      
      fontSize: 30,
    },
    marginLeft: 100,
    marginBottom: 100, 
    marginRight: 30,
    marginTop:60,
    insetTop: 0,
    insetLeft: 0,
    insetRight: 2,
    width: 1300,
    height: 700,
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#vis1').append(() => chart)
})
