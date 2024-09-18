const path = require('path');
const fs = require('fs');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'proyectoeventify'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

exports.addSalon = (req, res) => {
  console.log(req.files, req.body);
  if (!req.files || !req.body.name || !req.body.address || !req.body.price || !req.body.capacidad) {
    return res.status(400).send('Faltan campos requeridos.');
  }

  const { name, address, price, capacidad, cocina, wifi, estacionamiento, guardaObjetos, jardin, balcon, decoracion, sonido, banos, movilidad } = req.body;
  const image = req.files.image;

  const uploadPath = path.join(__dirname, '../public/uploads', image.name);

  image.mv(uploadPath, (err) => {
    if (err) {
      console.error('Error al guardar la imagen:', err);
      return res.status(500).send('Error al guardar la imagen.');
    }

    const query = `
      INSERT INTO salones (name, address, price, capacidad, image, cocina, wifi, estacionamiento, guardaObjetos, jardin, balcon, decoracion, sonido, banos, movilidad)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      name, address, price, capacidad, image.name,
      cocina ? true : false,
      wifi ? true : false,
      estacionamiento ? true : false,
      guardaObjetos ? true : false,
      jardin ? true : false,
      balcon ? true : false,
      decoracion ? true : false,
      sonido ? true : false,
      banos ? true : false,
      movilidad ? true : false
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error al guardar el salón en la base de datos:', err);
        return res.status(500).send('Error al guardar el salón en la base de datos.');
      }
      res.redirect('/admin/hallsad');
    });
  });
};

exports.getAllSalons = async (req, res) => {
  try {
    const [rows] = await req.db.query('SELECT * FROM salones');
    res.render('User/halls', { salons: rows }); // Asegúrate de pasar la variable salons
  } catch (err) {
    console.error('Error al obtener los salones:', err);
    res.status(500).send('Error al obtener los salones.');
  }
};

exports.getAllSalonsAdmin = (req, res) => {
  const query = 'SELECT * FROM salones';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error al obtener los salones.');
    }

    // Renderiza la vista de administración con los salones
    res.render('admin/hallsad', { salons: results });
  });
};


exports.getSalonDetails = (req, res) => {
  const salonId = req.params.id;
  const query = 'SELECT * FROM salones WHERE id = ?';

  db.query(query, [salonId], (err, results) => {
    if (err) {
      console.error('Error al obtener los detalles del salón:', err);
      return res.status(500).send('Error al obtener los detalles del salón.');
    }
    if (results.length === 0) {
      console.log(`No se encontró el salón con ID: ${salonId}`);
      return res.status(404).send('Salón no encontrado.');
    }

    res.render('admin/sub_hallsad', { salon: results[0] });
  });
};

exports.getSalonDetailsUser = (req, res) => {
  const salonId = req.params.id;
  const query = 'SELECT * FROM salones WHERE id = ?';

  db.query(query, [salonId], (err, results) => {
    if (err) {
      console.error('Error al obtener los detalles del salón:', err);
      return res.status(500).send('Error al obtener los detalles del salón.');
    }
    if (results.length === 0) {
      console.log(`No se encontró el salón con ID: ${salonId}`);
      return res.status(404).send('Salón no encontrado.');
    }

    res.render('User/sub_halls', { salon: results[0] });
  });
};


exports.getSalonForEdit = (req, res) => {
  const salonId = req.params.id;
  const query = 'SELECT * FROM salones WHERE id = ?';

  db.query(query, [salonId], (err, results) => {
    if (err) {
      return res.status(500).send('Error al obtener los detalles del salón.');
    }
    if (results.length === 0) {
      return res.status(404).send('Salón no encontrado.');
    }

    res.render('admin/editRoom', { salon: results[0] });
  });
};

exports.editSalon = (req, res) => {
  const salonId = req.params.id;
  const { name, address, price, capacidad, cocina, wifi, estacionamiento, guardaObjetos, jardin, balcon, decoracion, sonido, banos, movilidad } = req.body;
  const image = req.files ? req.files.image : null;

  let updateQuery = `
    UPDATE salones
    SET name = ?, address = ?, price = ?, capacidad = ?, cocina = ?, wifi = ?, estacionamiento = ?, guardaObjetos = ?, jardin = ?, balcon = ?, decoracion = ?, sonido = ?, banos = ?, movilidad = ?
    WHERE id = ?
  `;

  let values = [
    name, address, price, capacidad,
    cocina ? true : false,
    wifi ? true : false,
    estacionamiento ? true : false,
    guardaObjetos ? true : false,
    jardin ? true : false,
    balcon ? true : false,
    decoracion ? true : false,
    sonido ? true : false,
    banos ? true : false,
    movilidad ? true : false,
    salonId
  ];

  if (image) {
    const imagePath = path.join(__dirname, '../public/uploads', image.name);
    image.mv(imagePath, (err) => {
      if (err) {
        console.error('Error al guardar la imagen:', err);
        return res.status(500).send('Error al guardar la imagen.');
      }

      // Primero elimina la imagen antigua
      const oldImageQuery = 'SELECT image FROM salones WHERE id = ?';
      db.query(oldImageQuery, [salonId], (err, results) => {
        if (err) {
          console.error('Error al obtener la imagen antigua:', err);
          return res.status(500).send('Error al obtener la imagen antigua.');
        }
        const oldImage = results[0]?.image;
        if (oldImage) {
          fs.unlink(path.join(__dirname, '../public/uploads', oldImage), (err) => {
            if (err) {
              console.error('Error al eliminar la imagen antigua:', err);
            }
          });
        }

        // Actualiza la base de datos con la nueva imagen
        updateQuery = `
          UPDATE salones
          SET name = ?, address = ?, price = ?, image = ?, cocina = ?, wifi = ?, estacionamiento = ?, guardaObjetos = ?, jardin = ?, balcon = ?, decoracion = ?, sonido = ?, banos = ?, movilidad = ?
          WHERE id = ?
        `;
        values = [
          name, address, price, image.name,
          cocina ? true : false,
          wifi ? true : false,
          estacionamiento ? true : false,
          guardaObjetos ? true : false,
          jardin ? true : false,
          balcon ? true : false,
          decoracion ? true : false,
          sonido ? true : false,
          banos ? true : false,
          movilidad ? true : false,
          salonId
        ];

        db.query(updateQuery, values, (err, result) => {
          if (err) {
            console.error('Error al actualizar el salón:', err);
            return res.status(500).send('Error al actualizar el salón.');
          }
          res.redirect('/admin/hallsad');
        });
      });
    });
  } else {
    db.query(updateQuery, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el salón:', err);
        return res.status(500).send('Error al actualizar el salón.');
      }
      res.redirect('/admin/hallsad');
    });
  }
};

exports.deleteSalon = (req, res) => {
  const salonId = req.params.id;
  
  const query = 'DELETE FROM salones WHERE id = ?';
  db.query(query, [salonId], (err, result) => {
    if (err) {
      console.error('Error al eliminar el salón:', err);
      return res.status(500).send('Error al eliminar el salón.');
    }
    res.redirect('/admin/hallsad');
  });
};




