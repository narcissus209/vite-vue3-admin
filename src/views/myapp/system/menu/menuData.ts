export const typeMap: any = {
  menu: {
    type: '',
    span: '菜单'
  },
  menuView: {
    type: 'warning',
    span: '菜单视图'
  },
  view: {
    type: 'success',
    span: '视图'
  }
}

export const getPids = (id: string, menu: Menu.IMenu[]): Menu.Pids => {
  const pids: Menu.Pids = []
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].id === id) {
      pids.push(menu[i].id)
      return pids
    } else {
      if (menu[i]?.children?.length) {
        const res: Menu.Pids = getPids(id, menu[i].children as Menu.IMenu[])
        if (res.length) {
          pids.push(menu[i].id, ...res)
        }
      }
    }
  }
  return pids
}
