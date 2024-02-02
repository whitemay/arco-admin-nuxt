import Mock from 'mockjs'

const rulesPresetList: ServiceRecord[] = [
  {
    id: 1,
    title: '内容屏蔽规则',
    description:
      '用户在执行特定的内容分发任务时，可使用内容屏蔽规则根据特定标签，过滤内容集合。',
    enable: true,
    actionType: 'switch',
  },
  {
    id: 2,
    title: '内容置顶规则',
    description:
      '该规则支持用户在执行特定内容分发任务时，对固定的几条内容置顶。',
    enable: true,
    actionType: 'switch',
  },
  {
    id: 3,
    title: '内容加权规则',
    description: '选定内容加权规则后可自定义从不同内容集合获取内容的概率。',
    enable: false,
    actionType: 'switch',
  },
  {
    id: 4,
    title: '内容分发规则',
    description: '内容分发时，对某些内容需要固定在C端展示的位置。',
    enable: true,
    actionType: 'switch',
  },
  {
    id: 5,
    title: '违禁内容识别',
    description: '精准识别赌博、刀枪、毒品、造假、贩假等违规物品和违规行为。',
    enable: false,
    actionType: 'switch',
  },
  {
    id: 6,
    title: '多语言文字符号识别',
    description:
      '精准识别英语、维语、藏语、蒙古语、朝鲜语等多种语言以及emoji表情形态的语义识别。',
    enable: false,
    actionType: 'switch',
  },
]
export default eventHandler(() => {
  return successResponseWrap(
    rulesPresetList.map((_, index) => ({
      ...rulesPresetList[index % rulesPresetList.length],
      id: Mock.Random.guid(),
    })),
  )
})
