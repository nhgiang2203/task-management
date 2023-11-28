const Task = require('../models/task.model');

const paginationHelper = require('../../../helpers/pagination');
const searchHelper = require('../../../helpers/search');

//[GET]/api/v1/tasks
module.exports.index = async(req, res) => {
  const find = {
    $or: [
      {createBy: req.user.id},
      {listUsers: req.user.id}
    ],
    deleted: false
  }

  //Bộ lọc
  if(req.query.status){
    find.status = req.query.status
  }
  //Hết bộ lọc

  //Search
  const objectSearch = searchHelper(req.query);
  if(objectSearch.regex){
    find.title = objectSearch.regex;
  }
  //End search

  //Pagination
  const countTasks = await Task.countDocuments(find);
  let objectPagination = paginationHelper({
    currentPage: 1,
    limitItems: 2
  },
  req.query,
  countTasks
  );
  //End Pagination
  //Sort
  const sort = {};
  if(req.query.sortKey && req.query.sortValue){
    sort[req.query.sortKey] = req.query.sortValue;
  }

  const tasks = await Task.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);

  res.json(tasks);
}

//[GET]/api/v1/tasks/detail/:id
module.exports.detail = async(req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    deleted: false
  });

  res.json(task);
}

//[PATCH]/api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
  try{
    await Task.updateOne({
        _id: req.params.id
      }, {
        status: req.body.status
      }      
    );

    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công!"
    });
  } catch(error){
    res.json({
      code: 400,
      message: "Cập nhật trạng thái thất bại!"
    });
  }
  
}

//[PATCH]/api/v1/tasks/change-multi
module.exports.changeMulti = async (req, res) => {
  try{
    const {ids, key, value} = req.body;

    switch(key) {
      case "status":
        await Task.updateMany({
          _id: {$in: ids}
        }, {
          status: value
        });
        res.json({
          code: 200,
          message: "Cập nhật trạng thái thành công!"
        });
        break;
      
      case "deleted":
        await Task.updateMany({
          _id: {$in: ids}
        }, {
          deleted: true,
          deletedAt: new Date()
        });
        res.json({
          code: 200,
          message: "Xóa thành công!"
        });
        break;
      default:
        res.json({
          code: 400,
          message: "Cập nhật trạng thái thất bại!"
        });
        break;
    }
    
  } catch(error){
    res.json({
      code: 400,
      message: "Cập nhật trạng thái thất bại!"
    });
  }
  
}

//[POST]/api/v1/tasks/create
module.exports.create = async (req, res) => {
  try {
    req.body.createBy = req.user.id;
    const task = new Task(req.body);
    const data = await task.save();

    res.json({
      code: 200,
      message: 'Tạo thành công',
      data: data
    });
  } catch(error) {
      res.json({
        code: 400,
        message: 'Lỗi'
      });
  }
  
}

//[PATCH]/api/v1/tasks/edit/:id
module.exports.edit = async(req, res) => {
  try {
    await Task.updateOne({
      _id: req.params.id
    }, req.body);
    res.json({
      code: 200,
      message: 'Cập nhật thành công'
    });
  } catch(error) {
    res.json({
      code: 400,
      message: 'Lỗi'
    });
    }
  
}

//[DELETE] /api/v1/tasks/delete/:id
module.exports.delete = async (req, res) => {
  try{
    await Task.updateOne({
      _id: req.params.id
    }, {
      deleted: true,
      deleteAt: new Date()
    });
    res.json({
      code: 200,
      message: 'Xóa thành công'
    });
  } catch(error) {
    res.json({
      code: 400,
      message: 'Lỗi'
    });
  }
}