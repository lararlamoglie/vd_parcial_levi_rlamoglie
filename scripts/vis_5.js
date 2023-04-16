const mapaFetch = d3.json('barrios-caba3.geojson')
const dataFetch = d3.dsv(';', '147_desratizacion.csv', d3.autoType)
  .then(data => data.filter(d => d.domicilio_barrio === "PALERMO"))

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
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
        r: 6,
        stroke: 'estado_del_contacto',
        fill: 'estado_del_contacto'
      }),
    ],
    color:{
      range:["#ff", "#BB7"]
    }
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#vis5').append(() => chartMap)
})
