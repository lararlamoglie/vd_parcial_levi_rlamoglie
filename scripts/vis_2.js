// config. fecha español
d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

d3.dsv(',', 'https://lararlamoglie.github.io/vd_parcial_levi_rlamoglie/data/147_desratizacion.csv', d3.autoType).then(data => {
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
      domain: [0,80],
      label: "",
    },
    facet:{
      data:data,
      y: "domicilio_barrio",
      label: "",
    },
    fy:{
      padding: 0.05,
      tickFormat: "",
    },
    marginRight: 10,
    marks: [
      Plot.barX(data,
        Plot.binX(
          {x: 'count',},
          {
            y: 'hora_agrupada',
            fill: d => {
              if (d.hora_agrupada === '12 - 15 hs' && d.domicilio_barrio === 'PALERMO') {
                return 'rgba(80, 163, 164, 1)';
              } else if (d.hora_agrupada === '12 - 15 hs') {
                  if(d.domicilio_barrio === "SAAVEDRA"){
                    return 'rgba(249, 83, 53, 1)'
                  }
                  else{
                    return 'rgba(252, 175, 56, 1)'
                  }
              } else if (d.domicilio_barrio === 'PALERMO') {
                return 'rgba(80, 163, 164, 0.6)';
              } else if(d.domicilio_barrio === 'SAAVEDRA'){
                return 'rgba(249, 83, 53, 0.6)';
              }else{
                return 'rgba(252, 175, 56, 0.6)';
              }

            },
            sort:{
              fy: {value: "x", reverse: true,}
            }
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
            dx: 332,
            dy: 68,
            fontSize: 18,
            fontWeight: "600",
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
            dx: 276,
            dy:45,
            fontSize: 18,
            fontWeight: "600",
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
            dx:878,
            dy:45,
            fontSize: 18,
            fontWeight: "600",
          },
        ),
      ),
    ],
    color:{
      range: ["#fcaf38","#50a3a4" ,"#f95335" ]
    },
    style:{
      fontSize: 16,
    },
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#vis_2').append(() => chart)
})


