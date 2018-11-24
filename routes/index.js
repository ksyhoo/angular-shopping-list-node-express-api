module.exports = function(app, client) {
  const db = client.db("shopinglistapi");

  app.post("/api/insert_produce", (req, res) => {
    const produce = {
      name: req.body.name
    };

    db.collection("produce").findOne({ name: produce.name }, (err, result) => {
      if (err) throw err;
      else {
        if (!result) {
          db.collection("produce").insert([produce], (err, result) => {
            if (err) {
              res.send({ error: "An error has occurred" });
            } else {
              res.status(200).send(result.ops[0]);
            }
          });
        } else {
          res.status(500).send("Duplicate");
        }
      }
    });
  });

  app.delete("/api/delete_produce/:produceName", (req, res) => {
    const produce = {
      name: req.params.produceName
    };

    db.collection("produce").findOne({ name: produce.name }, (err, result) => {
      if (err) throw err;
      else {
        if (result) {
          console.log(result, produce);
          db.collection("produce").remove({ _id: result._id }, (err, result) => {
            if (err) {
              res.send({ error: "An error has occurred" });
            } else {
              res.status(200).send(result);
            }
          });
        } else {
          res.status(500).send("No such record to delete");
        }
      }
    });
  });

  app.get("/api/get_items", (req, res) => {
    db.collection("produce")
      .find()
      .toArray((err, result) => {
        if (err) throw err;
        res.status(200).send(result);
      });
  });

  app.get("/api/get_lists", (req, res) => {
    db.collection("lists")
      .find()
      .toArray((err, result) => {
        console.log(result);

        if (err) throw err;
        res.status(200).send(result);
      });
  });
};
