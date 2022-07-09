// npx jest test/unit.test.js

test("common matcher", ()=>{
  expect(2+2).toBe(4)
})

test("to be true or false",()=>{
  const truthy = isNaN(1)
  expect(truthy).toBeTruthy()
})

test("number", ()=>{
  expect(4).toBeGreaterThan(3)
  expect(2).toBeLessThan(3)
})

test("object",()=>{
  // 值相等
  expect({name: "mahoo"}).toEqual({name: "mahoo"})
  // 是否为同一对象
  const a = {}, b=a;
  expect(a).toBe(b)
})