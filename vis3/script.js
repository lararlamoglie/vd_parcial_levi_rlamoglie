
d3.dsv(',', '147_desratizacion_.csv', d3.autoType).then(data => {
console.log(data.length)
data = data.filter(d => ['Belgrano', 'Boedo', 'Almagro'].includes(d.domicilio_barrio));
  console.log(data) //ver en pantalla


  let chart = Plot.plot({ //genera una visualizacion, guarda el gráfico en la variable chart
    facet:{
      data: data,
      x: "domicilio_barrio",
      label: "",
    },
    fx:{
      padding: 0.1,
    },
    marks: [
      Plot.frame(),
      Plot.dot(data,
        Plot.groupX({y:"count"},
          {x: "hora_agrupada", 
          fill: "domicilio_barrio",
          stroke: "domicilio_barrio",
          r: 6,
          fillOpacity: 1,
        })
      ),
    ],
    y: {
      label: 'Cant',
      labelOffset: 30,
      //domain: [0,1000]
    },
    x: {
      
      label: 'Hora',
      labelOffset: 12,
      //domain: [0,24]
    },
    color:{
      type: "categorical",
      scheme:'rainbow',
      legend: false,
    },

    style:{
      fontFamily: 'sans-serif',
      fontSize: 12,
      background: 'hsl(0, 0%, 100%)',
      color: 'black',
      padding: '10px',
    },
    marginLeft: 60,
    marginRight: 100,
    marginTop:25,
    insetTop: 0,
    insetLeft: 0,
    insetRight: 1,
    width: 1300,
    height: 700,
    
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart) //agregamos el grafico a index.html
})
