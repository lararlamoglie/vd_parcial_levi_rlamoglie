// config. fecha español
d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

d3.dsv(',', '../data/147_desratizacion.csv', d3.autoType).then(data => {
  data = data.filter(d => ['BALVANERA', 'PALERMO', 'SAAVEDRA',].includes(d.domicilio_barrio));
  console.log(data.length)

  let chart = Plot.plot({
    width: 1000,
    height: 500,
    marginLeft: 80,
    marginRight: 130,
    y: {
      label: "",
      //domain: ["00 - 03 hs","4-7", "8-11", "12-15", "16-19", "20-23"]
    },
    x:{
      domain: [0,85],
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
            y: 'hora_agrupada',
            fill: 'domicilio_barrio',
          },
        ),
      ),
      Plot.text(data,
        Plot.binX(
          {x: 'count',},
          {
            y: 'hora_agrupada',
            fill: '#fcaf38',
            text: ["37"],
            dx: 274,
            dy: 65,
            fontSize: 18,
          },
        ),
      ),
      Plot.text(data,
        Plot.binX(
          {x: 'count',},
          {
            y: 'hora_agrupada',
            fill: '#f95335',
            fy: ["SAAVEDRA"],
            text: ["24"],
            dx: 228,
            dy:-22,
            fontSize: 18,
          },
        ),
      ),
      Plot.text(data,
        Plot.binX(
          {x: 'count',},
          {
            y: 'hora_agrupada',
            fill: '#50a3a4',
            fy: ["PALERMO"],
            text: ["77"],
            dx:720,
            dy:-22,
            fontSize: 18,
          },
        ),
      ),
    ],
    color:{
      range: ["#fcaf38","#50a3a4" ,"#f95335" ]
    },
    style:{
      fontSize: 15,
    },
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#vis_2').append(() => chart)
})


