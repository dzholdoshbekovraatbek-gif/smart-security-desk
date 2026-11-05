const test=require('node:test'),assert=require('node:assert/strict');
const {app}=require('../server.js');
test('server summary contains numerical counts',async()=>{
 const srv=app.listen(0,'127.0.0.1');
 try{await new Promise(res=>srv.once('listening',res));const url=`http://127.0.0.1:${srv.address().port}/api/summary`;
 const resp=await fetch(url);assert.equal(resp.status,200);const data=await resp.json();
 for(const key of ['cameras','online','openIncidents','events'])assert.equal(typeof data[key],'number');
 assert.ok(data.cameras>=data.online);
 }finally{await new Promise(res=>srv.close(res));}
});
