//get all employees
app.get('/employees', (req, res) => {
    connection.query('select * from employee', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//get employee by id
app.get('/employee/:id', (req, res) => {
    connection.query('select * from employee where empid=?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//delete employee
app.delete('/employee/:id', (req, res) => {
    connection.query('delete from employee where empid=?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Record deleted successfully.')
        else
            res.send(err);
    })
});

//post employee
app.post('/employee/', (req, res) => {
    //console.log(req.body.body);
    var emp = req.body;
    console.log(emp);
    var sql = `set @EmpId=?;set @Name=?;set @EmpCode=?;set @Salary=?;
               CALL EmployeeAddOrEdit(@EmpId,@Name,@EmpCode,@Salary)`
    connection.query(sql, [emp.EmpId, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err) {
            const emp = rows.filter(function (elem) {
                return elem.constructor == Array;
            });
            res.send('Inserted Id : ' + emp[0][0].EmpId);
        }
        else
            res.send(err);
    })
});

//update employee
app.put('/employee/', (req, res) => {
    var emp = req.body;
    var sql = `set @EmpId=?;set @Name=?;set @EmpCode=?;set @Salary=?;
               CALL EmployeeAddOrEdit(@EmpId,@Name,@EmpCode,@Salary)`
    connection.query(sql, [emp.EmpId, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err) {
            res.send('Updated successfully');
        }
        else
            res.send(err);
    })
});