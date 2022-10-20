import { useTablistSelection } from "./tablist.hooks"
import { 
  Tab,
  TablistWrapper, 
  TabSelections, 
  TabSelectionsWrapper} from "./tablist.styled"


export type ParamsPath = {
  name: string,
  query: string
}

type TablistProps = {
  children: React.ReactNode,
  paramsPaths: ParamsPath[],
  extraChildren?: React.ReactElement,
  isRouting?: boolean
}

const Tablist = ( { children, paramsPaths, extraChildren, isRouting }: TablistProps ) =>{
  const {
    currentTabindex,
    addTabRef,
    handleChangeTabFocus,
    handleChangeCurrentTabindex,
  } = useTablistSelection(paramsPaths, isRouting)

  const renderTabSelections = () => {
    const tabSelections = paramsPaths.map((params, index) => (
      <Tab 
        key={ params.name }
        id={ `selection-${ index }` }
        role="tab"
        ref={ addTabRef }
        tabIndex={ currentTabindex===index? 0 : -1 }
        onClick={ handleChangeCurrentTabindex }
        data-index={ index }
        aria-controls="tablist-content"
        aria-selected={ currentTabindex===index }> { params.name }
      </Tab>
    ))

    return tabSelections
  }

  return (
    <TablistWrapper>
      <TabSelectionsWrapper onKeyDown={ handleChangeTabFocus }>
        <TabSelections 
          role="tablist" 
          aria-label="user selections"> { renderTabSelections() }
        </TabSelections>
        { extraChildren && <>
          { extraChildren }
        </>}
      </TabSelectionsWrapper>
      <div 
        id="tablist-content"
        role="tabpanel"
        aria-labelledby={ `selection-${ currentTabindex }` }>{ Array.isArray(children) ? children[currentTabindex] : children }
      </div>
    </TablistWrapper>
  )
}


export default Tablist;