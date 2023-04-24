const mapaFetch2 = d3.json('../data/barrios-caba2.geojson')
const dataFetch4 = d3.dsv(',', '../data/147_desratizacion.csv', d3.autoType)
  .then(data => data.filter(d => d.domicilio_barrio === "BALVANERA"))

Promise.all([mapaFetch2, dataFetch4]).then(([barrios, data]) => {
  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    marks: [
      Plot.geo(barrios, {
        stroke: '#000',
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
      range: ["#FF", "#fcaf38"],
    },
    width:300,
    height: 250,
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#vis4').append(() => chartMap)
})
