import React from 'react';
import intl from 'react-intl-universal';
import { Tooltip } from 'antd'
import Currency from '../../../../modules/settings/CurrencyContainer'
import {accMul} from '../../../../common/Loopring/common/math'

const uiFormatter = window.uiFormatter
const fm = window.uiFormatter.TokenFormatter

function ListOrderBook(props) {
  const {className, style,depth,market="",prices} = props;
  const tokenL = market.split('-')[0].toUpperCase()
  const tokenR = market.split('-')[1].toUpperCase()
  const tokenRPrice = prices.getTokenBySymbol(tokenR)
  let sell = []
  if(depth && depth.sell) {
    if(depth.sell.length > 8) {
      depth.sell = depth.sell.slice(depth.sell.length - 8, depth.sell.length)
    }
    sell = Array(8-depth.sell.length).fill([]).concat(depth.sell)
  }
  const priceValue = (exchangeRatio) => {
    return (
      <span className="fs10">
        <Currency/>
        {exchangeRatio > 0 && tokenRPrice ? accMul(exchangeRatio, tokenRPrice.price).toFixed(2) : 0}
      </span>
    )
  }
  const ListItem = ({item,side})=>{
    if(item && item.length === 3){
      return (
        <tr className="">
          <td className="border-none pl10">
            {
              side === 'sell' &&
              <div className="fs12 color-red-500 text-left p0 lh24">
                <Tooltip placement="left" title={priceValue(Number(item[0]).toFixed(8))}>
                  {Number(item[0]).toFixed(8)}
                </Tooltip>
              </div>
            }
            {
              side === 'buy' &&
              <div className="fs12 color-green-500 text-left p0 lh24">
                <Tooltip placement="left" title={priceValue(Number(item[0]).toFixed(8))}>
                  {Number(item[0]).toFixed(8)}
                </Tooltip>
              </div>
            }
          </td>
          <td className="border-none pl5 pr5">
            <div className="fs12 color-black-2 text-left p0 lh24">
              {Number(item[1]).toFixed(4)}
            </div>
          </td>
          <td className="border-none pr10">
            <div className="fs12 color-black-2 text-right p0 lh24">
              {Number(item[2]).toFixed(4)}
            </div>
          </td>
        </tr>
      )
    } else {
      return (
        <tr className="cursor-pointer">
          <td className="border-none pl10"><div className="fs12 color-red-500 text-left p0 lh24">&nbsp;</div></td>
          <td className="border-none pl5 pr5"><div className="fs12 color-black-2 text-center p0 lh24">&nbsp;</div></td>
          <td className="border-none pr10"><div className="fs12 color-black-2 text-right p0 lh24">&nbsp;</div></td>
        </tr>
      )
    }
  }

  return (
    <div className={className} style={{...style}}>
      <div style={{height:'229px',overflow:'hidden'}}>
        <table className="w-100" >
          <tbody style={{height:'210px',paddingTop:'5px'}} >
           <tr className="zb-b-b">
             <th className="border-none p0 pl10 lh25">
               <div className="fs12 color-black-3 text-left font-weight-normal">
                 {intl.get('trade.sell')}{intl.get('global.price')} ({tokenR})
               </div>
             </th>
             <th className="border-none p0 pl5 pr5 lh25">
               <div className="col-auto fs12 color-black-3 text-left font-weight-normal">
                 {intl.get('global.amount_label')} ({tokenL})
               </div>
             </th>
             <th className="border-none p0 pr10 lh25">
               <div className="col-auto fs12 color-black-3 text-right font-weight-normal">
                 {intl.get('global.total')} ({tokenR})
               </div>
             </th>
           </tr>
            {
              false && depth && depth.sell && depth.sell.length < 8 &&
              Array(8-depth.sell.length).fill(1).map((item,index)=>
                <tr className="" key={index}>
                  <td colSpan="10" className="border-none p0" style={{lineHeight:'26px'}}>
                    <div className="fs12 color-black-3" style={{lineHeight:'26px'}}>
                      &nbsp;
                    </div>
                  </td>
                </tr>
              )
            }
            {
              sell && sell.map((item,index)=>
               <ListItem key={index} item={item} side="sell" />
              )
            }
            {
              !(depth && depth.sell && depth.sell.length > 0) &&
              <tr >
                <td colSpan="10" className="fs12 border-none text-center color-black-3 lh20  pt10 pb10">{intl.get('global.no_data')}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <div style={{height:'230px',overflow:'hidden'}}>
        <table className="w-100 zb-b-t" >
          <tbody >
            <tr className="zb-b-b">
              <th className="border-none p0 pl10 lh25">
                <div className="fs12 color-black-3 text-left font-weight-normal">
                  {intl.get('trade.buy')}{intl.get('global.price')} ({tokenR})
                </div>
              </th>
              <th className="border-none p0 pl5 pr5 lh25">
                <div className="col-auto fs12 color-black-3 text-left font-weight-normal">
                  {intl.get('global.amount_label')} ({tokenL})
                </div>
              </th>
              <th className="border-none p0 pr10 lh25">
                <div className="col-auto fs12 color-black-3 text-right font-weight-normal">
                  {intl.get('global.total')} ({tokenR})
                </div>
              </th>
            </tr>
            {
              depth && depth.buy && depth.buy.map((item,index)=>
               <ListItem key={index} item={item} side="buy" />
              )
            }
            {
              !(depth && depth.buy && depth.buy.length > 0) &&
              <tr >
                <td colSpan="10" className="fs12 border-none text-center color-black-3 lh20 pt10 pb10">{intl.get('global.no_data')}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ListOrderBook
