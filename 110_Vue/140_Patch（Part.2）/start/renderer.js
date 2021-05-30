import { nodeOps } from './nodeOps.js';

function createVNode(type = '', props = {}, children = '') {
  return {
    type,
    props,
    children
  }
}

function patch(n1, n2, container) {
  console.log(n1, n2);
  let el;
    if (n1.type !== n2.type) {
    // divを生成し、bodyの中に配置 
    el = nodeOps.create(n2.type);
    nodeOps.append(container, el);
  }
    for (const key in n2.props) {
        const prevProp = n1.props[key];
        const nextProp = n2.props[key];
        // console.log(prevProp, nextProp);

        if (prevProp !== nextProp) {
            // propが一致しなければ、属性を追加
            if (key.startsWith('on')) {
                console.log(key.substring(2).toLowerCase(), nextProp);
                nodeOps.on(el, key.substring(2).toLowerCase(), () => {
                    nextProp();
                })
            } else {
                nodeOps.setAttr(el, key, nextProp);
            }
        }
  }
    // console.log(n2.props)
  if (n1.children !== n2.children) {
    // 子Nodeの中身が一致しなければ、innerHTMLで追加   
    nodeOps.html(el, n2.children);
  }
}

export { createVNode, patch };