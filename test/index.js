'use strict'
const tape = require('tape')
const Vertex = require('../')

tape('basic', function (t) {
  let root = new Vertex()
  const path = ['one', 'two', 'three']
  const value = 'this is a leaf'
  const leaf = new Vertex(value)
  let v3 = new Vertex(value)
  root = root.set(path[0], v3)
  t.equals(root.edges.size, 1, 'the root should have one edge')
  root = root.set(path, leaf)

  const leaf2 = root.get(path)
  t.equals(leaf2.value, value, 'set and get should work')

  const leafRoot = leaf2.root
  t.equals(leafRoot, root, 'should return the root')

  v3 = root.get(path[0])

  t.equals(v3.value, value, 'set and get should work for single path')

  let pathNodes = [...root.walkPath(path)]
  t.equals(pathNodes.length, 4, 'path length should be 4')

  root = root.del(path)
  pathNodes = [...root.walkPath(path)]
  t.equals(pathNodes.length, 1, 'delete should work')

  root = root.del(path[0])
  t.equals(root.isEmpty, true, 'delete should work')

  const sameRoot = root.del(path)
  t.equals(root, sameRoot, 'should not delete non-existant paths')

  root = root.set(path, leaf)
  root = root.set(path[0], leaf)
  pathNodes = [...root.walkPath(path)]
  t.equals(pathNodes.length, 2, 'it should overwrite the previous vertex')

  t.end()
})
