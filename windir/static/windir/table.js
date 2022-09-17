const pending = new Set();
getCellsInfo();

async function getCellsInfo() {
    const res = await getData('/cellsinfo/');
    if ('info' in res) {
        const cells = document.querySelectorAll('.cell');
        if (res.info.length == cells.length)
        {
            cells.forEach((cell, i) => {
                cell.classList.remove('present');
                if (res.info[i])
                    cell.classList.add('present');
            });
            return;
        }
    }
    
    console.log(res);
    document.getElementById('table-error').innerHTML = 'Не удалось загрузить данные о посещаемости. Повторите позже';
}

async function updateCell(memberId, gameId, matchNo) {
    const cell = event.target;

    if (! pending.has(cell)) {

        pending.add(cell);
        cell.classList.add('pending');

        const res = await getData('/tableupd/', 'PUT', {memberId: memberId, gameId: gameId, matchNo: matchNo}, true);
        if ('success' in res)
            cell.classList.toggle('present');
        else if ('error' in res) 
            document.getElementById('table-error').innerHTML = res.error;
        else {
            console.log(res);
            document.getElementById('table-error').innerHTML = 'Ошибка. Повторите позже';
        }

        cell.classList.remove('pending');
        pending.delete(cell);
    }
}

