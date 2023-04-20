const mapaFetch3 = d3.json('barrios-caba3.geojson')
const dataFetch5 = d3.dsv(';', '147_desratizacion.csv', d3.autoType)
  .then(data => data.filter(d => d.domicilio_barrio === "PALERMO"))

Promise.all([mapaFetch3, dataFetch5]).then(([barrios, data]) => {
  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    marks: [
      Plot.geo(barrios, {
        stroke: '#000',
        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
      }),
      Plot.dot(data, {
        x: 'lon',
        y: 'lat',
        r: 2,
        stroke: 'estado_del_contacto',
        fill: 'estado_del_contacto'
      }),
    ],
    color:{
      range:["#ff", "#50a3a4"],
      legend: true,
    },
    width: 300,
    height: 250,
  })
  /* Agregamos al DOM la visualización chartMap */
  d3.select('#vis5').append(() => chartMap)
})
