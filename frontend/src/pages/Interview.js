import React, { useEffect, useState } from 'react';

import CommonTable from '../components/CommonTable';
import CommonTableColumn from '../components/CommonTableColumn';
import CommonTableRow from '../components/CommonTableRow';

function GetData() {
  const [data, setData] = useState({});


  const item = (Object.values(data)).map((item) => (
    <CommonTableRow key={item.id}>
      <CommonTableColumn>{item.id}</CommonTableColumn>
      <CommonTableColumn>{item.title}</CommonTableColumn>
      <CommonTableColumn>{item.createAt}</CommonTableColumn>
      <CommonTableColumn>{item.username}</CommonTableColumn>
    </CommonTableRow>
  ));

  return item;
}

function resume() {
  const item = GetData();

  return (<>
    <CommonTable headersName={['글번호', '제목', '등록일', '작성자']}>
      {item}
    </CommonTable>
  </>);
}
  
export default resume;