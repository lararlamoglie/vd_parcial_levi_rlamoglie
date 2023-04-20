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
      //domain: ["00 - 03 hs","4-7", "8-11", "12-15", "16-19", "20-23"]
    },
    x:{
      domain: [0,60],
      label: "",
    },
    facet:{
      data:data,
      y: "domicilio_barrio",
      label: "",
    },
    fy:{
      padding: 0.1,
    },
    marks: [
      Plot.barX(data,
        Plot.binX(
          {x: 'count',},
          {
            y: 'hora_agrupada', thresholds: 10,
            fill: 'domicilio_barrio',
          },
        ),
      ),
      Plot.text(data,
        Plot.binX(
          {x: 'count',},
          {
            y: 'hora_agrupada',
            fill: 'domicilio_barrio',
            text: ["27"],
            dx: 280,
            dy: 68,
          },
        ),
      )
    ],
    color:{
      range: ["#fcaf38","#50a3a4" ,"#f95335" ]
    },
    style:{
      fontSize: 14,
    },
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#vis_2').append(() => chart)
})


