const mapaFetch = d3.json('/data/barrios-caba.geojson')
const dataFetch = d3.dsv(',', '../data/147_desratizacion.csv', d3.autoType)
  .then(data => data.filter(d => d.domicilio_barrio === "SAAVEDRA"))

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
        r: 2,
        stroke: 'estado_del_contacto',
        fill: 'estado_del_contacto'
      }),
    ],
    color:{
      range: ["#FFFFF", "#f95335"],
    },
    width:300,
    height: 300,
    style:{
      fontSize: 17,
    },
    
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#vis3').append(() => chartMap)
})