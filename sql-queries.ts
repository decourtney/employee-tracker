class SQLQueries
{
  buildQuery(val)
  {
    let query;
    switch (val[0].menuOptions)
    {
      case 'View Data':
        query = this.createView(val[1]);
        break;
      case 'Add Data':
        query = this.createAdd(val[1]);
        break;
      case 'Update Data':
        console.log(val[1]);
        break;
      case 'Delete Data':
        console.log(val[1]);
        break;
    }

    return query;
  }

  createView(val)
  {
    return [`SELECT * FROM (${ val.viewOptions })`, false];
  }

  createAdd(val)
  {
    let q;

    console.log('Creating insert command')
    switch (val.addOptions)
    {
      case 'Department':
        q = `INSERT INTO ${ val.addOptions } (department_name) VALUES ("${ val.deptName }")`;
        break;
      case 'Role':
        q = `INSERT INTO ${ val.addOptions } (title, salary, )`
    }

    return q;
  }
}
module.exports = SQLQueries;