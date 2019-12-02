// import './styles/index.scss';
class createGrid {
  constructor(col, row) {
    this.column = col;
    this.row = row;
  }
}

class UI {
  static createboard(table) {
    var grid = document.querySelector('#grid');

    for(let y=0; y<table.column; y++) {
      var rows = document.createElement('tr');
      grid.append(rows);
      for(let x=0; x<table.row; x++) {
        let cell = document.createElement('td');
        cell.className = 'cell';
        rows.append(cell);
      }
    }
  }

  static deleteBoard() {
    var grid = document.querySelector('#grid');
    grid.innerHTML = '';
  }

  static clearBoard() {
    var grid = document.querySelector('#grid');
    grid.children.style.background = 'white';
  }

  static clearFeild() {
    document.querySelector('#column').value = '';
    document.querySelector('#row').value = '';
  }

}

const zoom = (() => {
  let height = 10;
  let width = 10;
  

  function changeVal(x, y) {
    height += y;
    width += x;
  }

  return {
    add: function() {
      changeVal(2, 2);
    },

    sub: function() {
      changeVal(-2, -2);
    },

    resetVal: function() {
      height = 10;
      width = 10;
    },

    zoomOutIn: function() {
      let table = document.querySelectorAll('td');
      table.forEach((fig) => {
        fig.style.height = `${height}px`;
        fig.style.width = `${width}px`;
      });

    }

  }


})();





// EVENT TO CREATE BOARD
document.querySelector('#create-board').addEventListener('click', (e) => {
  e.preventDefault();
  let column = document.querySelector('#column').value;
  let row = document.querySelector('#row').value;

  var board = new createGrid(column, row);

  UI.createboard(board);
  UI.clearFeild();

  // EVENT TO PAINT THE BOARD
  let tableData = document.querySelectorAll('.cell');
  let tableArr = [...tableData];
  tableArr.forEach((tr) => {
    tr.addEventListener('click', () => {
      let color = document.querySelector('#color').value;
      tr.style.background = color;
    })
  })

});


// EVENT TO DELETE THE BOARD
document.querySelector('#delete').addEventListener('click', () => {
  UI.deleteBoard();
  zoom.resetVal();
});

// EVENT TO CLEAR PAINT ON BOARD
document.querySelector('#clear').addEventListener('click', () => {
  let clear = document.querySelectorAll('.cell');

  clear.forEach((all) => {
    all.style.background = 'white';
  });

  let td = document.querySelectorAll('td');

});

// EVENT TO DRAW 
document.querySelector('#draw').addEventListener('click', function() {
  let td = document.querySelectorAll('td');

  td.forEach((x) => {
    // x.style.border = 'none';
    x.classList.toggle('change');
  });

});

// EVENT TO ZOOMOUT AND ZOOMIN
document.querySelector('#zoomOut').addEventListener('click', () => {
  zoom.add();
  zoom.zoomOutIn();
});

document.querySelector('#zoomIn').addEventListener('click', () => {
  zoom.sub();
  zoom.zoomOutIn();
});





