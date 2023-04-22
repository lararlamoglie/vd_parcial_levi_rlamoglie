// config. fecha español
d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

d3.dsv(',', '147_desratizacion_act.csv', d3.autoType).then(data => {
  data = data.filter(d => ['BALVANERA', 'PALERMO', 'SAAVEDRA',].includes(d.domicilio_barrio));
  data = data.filter(d => ['LIMPIEZA Y RECOLECCIÓN'].includes(d.categoria));
 

  const monthNames = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];

  console.log(data.length)

  let chart = Plot.plot({
    width:1000,
    height:400,
    x: {
      //domain: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec" ],
      //tickFormat: d => d3.timeFormat('%B')(new Date(2021, d - 1, 1))
      label: "",
      tickFormat: d => monthNames[d -1],
    },
    y: {
      domain: [1,35],
      label: "",
    },
    //marginRight: 50,
    
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
        r:4,
      })),
      Plot.ruleY([1]),
      Plot.text(data.filter(d => d.mes_prestacion === 12), Plot.binY({y: "count"},{
        x: "mes_prestacion",
        z: "domicilio_barrio",
        dx: 0,
        dy: -16,
        text: ["14"],
        fill: "#fcaf38",
      })),
      Plot.text(data.filter(d => d.mes_prestacion === 12), Plot.binY({y: "count"},{
        x: "mes_prestacion",
        z: "domicilio_barrio",
        dx: 0,
        dy: -122,
        text: ["24"],
        fill: "#50a3a4",
      })),
      Plot.text(data.filter(d => d.mes_prestacion === 12), Plot.binY({y: "count"},{
        x: "mes_prestacion",
        z: "domicilio_barrio",
        dx: 0,
        dy: 44,
        text: ["8"],
        fill: "#f95335" ,
      })),
    ],
    
    color:{
      range: ["#fcaf38","#50a3a4" ,"#f95335" ]
    },
    style:{
      fontSize: 19,
    }
    //grid:true,
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#vis_1').append(() => chart)
})
