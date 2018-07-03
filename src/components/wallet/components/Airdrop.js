import React from 'react';
import {Card, Icon, Tooltip, Button,Alert} from 'antd';
import {generateBindAddressTx, getBindAddress} from "Loopring/ethereum/utils";
import {toHex, toBig, toNumber} from "Loopring/common/formatter";
import CoinIcon from '../../common/CoinIcon';
import {projects} from "../../../common/config/data";
import mapAsync from 'async/map';
import intl from 'react-intl-universal';
import {Page, Pages} from 'Loopr/Pages';
import AirdropBind from './AirdropBind'
import Notification from 'Loopr/Notification';
import request from 'Loopring/common/request'
import moment from 'moment'


const method = '51c10877697468647261776765ffb17449e971e4a1d96291cc9a3609d013cc050000000000000000012065ffb17449e971e4a1d96291cc9a3609d013cc0500000106000430323135fd111a011ac56b6c766b00527ac46c766b51527ac4616168164e656f2e52756e74696d652e47657454726967676572009c6c766b52527ac46c766b52c3640e02616114666f6214f9d89e423d2c40cbdd3a2bf9d949761b6168184e656f2e52756e74696d652e436865636b5769746e6573736c766b56527ac46c766b56c3640e00516c766b57527ac462a80561682953797374656d2e457865637574696f6e456e67696e652e476574536372697074436f6e7461696e65726c766b53527ac46c766b53c36168174e656f2e5472616e73616374696f6e2e476574547970656c766b54527ac46c766b54c36102d1009c009c6c766b58527ac46c766b58c3640e00006c766b57527ac46229056c766b53c36c766b55527ac46c766b55c36168234e656f2e496e766f636174696f6e5472616e73616374696f6e2e476574536372697074c0013d9c009c6c766b59527ac46c766b59c3640f0061006c766b57527ac462d1046c766b55c36168234e656f2e496e766f636174696f6e5472616e73616374696f6e2e47657453637269707400517f011c9c009c6c766b5a527ac46c766b5ac3640e00006c766b57527ac46284046c766b55c36168234e656f2e496e766f636174696f6e5472616e73616374696f6e2e476574536372697074011d01207f0351c1080877697468647261777e01677e61682d53797374656d2e457865637574696f6e456e67696e652e476574457865637574696e67536372697074486173687e9c009c6c766b5b527ac46c766b5bc3640f0061006c766b57527ac462f403516c766b57527ac462e9036168164e656f2e52756e74696d652e47657454726967676572609c6c766b5c527ac46c766b5cc364b403616c766b00c3076465706f736974876c766b5d527ac46c766b5dc3641700616c766b51c36165a0036c766b57527ac4628d036c766b00c3087769746864726177876c766b5e527ac46c766b5ec3641700616c766b51c3616576086c766b57527ac4625b036c766b00c317717565727941697244726f70546f74616c537570706c79876c766b5f527ac46c766b5fc3644800616168164e656f2e53746f726167652e476574436f6e746578740d61697264726f70537570706c79617c680f4e656f2e53746f726167652e4765746c766b57527ac462e9026c766b00c313717565727941697244726f7042616c616e6365876c766b60527ac46c766b60c3641700616c766b51c36165e50e6c766b57527ac462ac026c766b00c3157175657279417661696c61626c6542616c616e6365876c766b0111527ac46c766b0111c3641700616c766b51c3616574116c766b57527ac4626b026c766b00c31e7175657279417661696c61626c6542616c616e6365576974685068617365876c766b0112527ac46c766b0112c3641700616c766b51c361653f0b6c766b57527ac46221026c766b00c3117365745769746864726177537769746368876c766b0113527ac46c766b0113c3641700616c766b51c361656f0b6c766b57527ac462e4016c766b00c31371756572795769746864726177537769746368876c766b0114527ac46c766b0114c3644900616168164e656f2e53746f726167652e476574436f6e746578740e7769746864726177537769746368617c680f4e656f2e53746f726167652e4765746c766b57527ac46273016c766b00c31571756572794c617374576974686472617754696d65876c766b0115527ac46c766b0115c3641700616c766b51c36165ea0b6c766b57527ac46232016c766b00c316717565727941697264726f704163636f756e744e756d876c766b0116527ac46c766b0116c3644c00616168164e656f2e53746f726167652e476574436f6e746578741161697264726f704163636f756e744e756d617c680f4e656f2e53746f726167652e4765746c766b57527ac462bb006c766b00c313717565727941697264726f704163636f756e74876c766b0117527ac46c766b0117c3641700616c766b51c36165ec0b6c766b57527ac4627c006c766b00c309717565727944617461876c766b0118527ac46c766b0118c3644f00616c766b51c300c36c766b0119527ac46168164e656f2e53746f726167652e476574436f6e746578746c766b0119c3617c680f4e656f2e53746f726167652e4765746c766b57527ac4620f0061006c766b57527ac46203006c766b57c3616c75660111c56b6c766b00527ac4616114666f6214f9d89e423d2c40cbdd3a2bf9d949761b6168184e656f2e52756e74696d652e436865636b5769746e657373009c6c766b56527ac46c766b56c3640e00006c766b57527ac462a9046c766b00c3c0539c009c6c766b58527ac46c766b58c364050061f06c766b00c300c36c766b51527ac46c766b51c3c001149c009c6c766b59527ac46c766b59c364050061f06c766b00c351c36c766b52527ac46c766b52c300a16314006c766b52c3070031cae8a0e909a0620400516c766b5a527ac46c766b5ac364050061f06168164e656f2e53746f726167652e476574436f6e746578740d61697264726f70537570706c79617c680f4e656f2e53746f726167652e4765746c766b53527ac4006c766b54527ac46c766b51c3616589116c766b5b527ac46c766b5bc364dc00616168164e656f2e53746f726167652e476574436f6e746578741161697264726f704163636f756e744e756d617c680f4e656f2e53746f726167652e47657451936c766b5c527ac46168164e656f2e53746f726167652e476574436f6e746578741161697264726f704163636f756e744e756d6c766b5cc37e6c766b51c3615272680f4e656f2e53746f726167652e507574616168164e656f2e53746f726167652e476574436f6e746578741161697264726f704163636f756e744e756d6c766b5cc3615272680f4e656f2e53746f726167652e50757461616c766b00c352c36c766b55527ac40a666972737450686173656c766b55c3876c766b5d527ac46c766b5dc3649200616168164e656f2e53746f726167652e476574436f6e74657874610a666972737450686173656c766b51c37e617c680f4e656f2e53746f726167652e4765746c766b54527ac46168164e656f2e53746f726167652e476574436f6e74657874610a666972737450686173656c766b51c37e6c766b52c3615272680f4e656f2e53746f726167652e50757461616267010b7365636f6e6450686173656c766b55c3876c766b5e527ac46c766b5ec3649400616168164e656f2e53746f726167652e476574436f6e74657874610b7365636f6e6450686173656c766b51c37e617c680f4e656f2e53746f726167652e4765746c766b54527ac46168164e656f2e53746f726167652e476574436f6e74657874610b7365636f6e6450686173656c766b51c37e6c766b52c3615272680f4e656f2e53746f726167652e507574616162b5000a746869726450686173656c766b55c3876c766b5f527ac46c766b5fc3649200616168164e656f2e53746f726167652e476574436f6e74657874610a746869726450686173656c766b51c37e617c680f4e656f2e53746f726167652e4765746c766b54527ac46168164e656f2e53746f726167652e476574436f6e74657874610a746869726450686173656c766b51c37e6c766b52c3615272680f4e656f2e53746f726167652e50757461616206006161f06c766b53c36c766b54c3946c766b52c3930700935ebae2bc1da06319006c766b53c36c766b54c3946c766b52c393009f620400516c766b60527ac46c766b60c364050061f06168164e656f2e53746f726167652e476574436f6e746578740d61697264726f70537570706c796c766b53c36c766b54c3946c766b52c393615272680f4e656f2e53746f726167652e50757461616c766b51c36c766b52c3617c096465706f736974656453c168124e656f2e52756e74696d652e4e6f7469667961516c766b57527ac46203006c766b57c3616c75660114c56b6c766b00527ac4616c766b00c3c0519c009c6c766b5b527ac46c766b5bc364050061f06c766b00c300c36c766b51527ac46c766b51c3c0011c9c009c6c766b5c527ac46c766b5cc364050061f06c766b51c35801147f6c766b52527ac46168164e656f2e53746f726167652e476574436f6e746578740e7769746864726177537769746368617c680f4e656f2e53746f726167652e4765746c766b53527ac46c766b53c3009c6c766b5d527ac46c766b5dc364050061f06c766b52c3610a66697273745068617365617c65ed076c766b54527ac46c766b52c3610b7365636f6e645068617365617c65cf076c766b55527ac46c766b52c3610a74686972645068617365617c65b2076c766b56527ac46c766b54c36c766b55c3936c766b56c3936c766b57527ac46c766b57c3519f6c766b5e527ac46c766b5ec364050061f061682d53797374656d2e457865637574696f6e456e67696e652e476574457865637574696e67536372697074486173686c766b58527ac4087472616e7366657253c576006c766b58c3c476516c766b52c3c476526c766b57c3c4617c675f89105fdcf8b97739c68f3e969d60b6e98bfa066c766b59527ac46c766b59c3519c6c766b5a527ac46c766b5ac36c766b5f527ac46c766b5fc3640602616168184e656f2e426c6f636b636861696e2e4765744865696768746168184e656f2e426c6f636b636861696e2e4765744865616465726168174e656f2e4865616465722e47657454696d657374616d706c766b60527ac46168164e656f2e53746f726167652e476574436f6e746578746c766b52c3106c617374576974686472617754696d657e6c766b60c3615272680f4e656f2e53746f726167652e507574616168164e656f2e53746f726167652e476574436f6e746578746c766b52c30a77697468647261774e6f7e617c680f4e656f2e53746f726167652e4765746c766b0111527ac46c766b0111c351936c766b0111527ac46168164e656f2e53746f726167652e476574436f6e746578746c766b52c30a77697468647261774e6f7e6c766b0111c3615272680f4e656f2e53746f726167652e5075746161682953797374656d2e457865637574696f6e456e67696e652e476574536372697074436f6e7461696e65726c766b0112527ac46168164e656f2e53746f726167652e476574436f6e746578746c766b52c3067478496e666f7e6c766b0111c37e6c766b0112c36168174e656f2e5472616e73616374696f6e2e47657448617368615272680f4e656f2e53746f726167652e50757461616c766b52c36c766b57c3617c08776974686472657753c168124e656f2e52756e74696d652e4e6f74696679616162100061006c766b0113527ac4620f00516c766b0113527ac46203006c766b0113c3616c756655c56b6c766b00527ac4616c766b00c3c0529c009c6c766b53527ac46c766b53c3640e00006c766b54527ac46238006c766b00c300c36c766b51527ac46c766b00c351c36c766b52527ac46c766b51c36c766b52c3617c6561046c766b54527ac46203006c766b54c3616c756655c56b6c766b00527ac4616114666f6214f9d89e423d2c40cbdd3a2bf9d949761b6168184e656f2e52756e74696d652e436865636b5769746e657373009c6c766b51527ac46c766b51c3640e00006c766b52527ac462cf006c766b00c3c0519c009c6c766b53527ac46c766b53c3640e00006c766b52527ac462ab006c766b00c300c3026f6e876c766b54527ac46c766b54c3644600616168164e656f2e53746f726167652e476574436f6e746578740e776974686472617753776974636851615272680f4e656f2e53746f726167652e5075746161624300616168164e656f2e53746f726167652e476574436f6e746578740e776974686472617753776974636800615272680f4e656f2e53746f726167652e5075746161516c766b52527ac46203006c766b52c3616c756655c56b6c766b00527ac4616c766b00c3c0519c009c6c766b52527ac46c766b52c3640e00006c766b53527ac46283006c766b00c300c36c766b51527ac46c766b51c3c001149c009c6c766b54527ac46c766b54c3640e00006c766b53527ac46250006168164e656f2e53746f726167652e476574436f6e746578746c766b51c3106c617374576974686472617754696d657e617c680f4e656f2e53746f726167652e4765746c766b53527ac46203006c766b53c3616c756655c56b6c766b00527ac4616c766b00c3c0519c009c6c766b52527ac46c766b52c3640f0001006c766b53527ac46293006c766b00c300c36c766b51527ac46c766b51c3009f6311006c766b51c30400e1f505a0620400516c766b54527ac46c766b54c3640f0001006c766b53527ac46251006168164e656f2e53746f726167652e476574436f6e746578741161697264726f704163636f756e744e756d6c766b51c37e617c680f4e656f2e53746f726167652e4765746c766b53527ac46203006c766b53c3616c756658c56b6c766b00527ac4616c766b00c3c0529c009c6c766b53527ac46c766b53c3640e00006c766b54527ac46268016c766b00c300c36c766b51527ac46c766b00c351c36c766b52527ac40a666972737450686173656c766b52c3876c766b55527ac46c766b55c3644c00616168164e656f2e53746f726167652e476574436f6e74657874610a666972737450686173656c766b51c37e617c680f4e656f2e53746f726167652e4765746c766b54527ac462e3000b7365636f6e6450686173656c766b52c3876c766b56527ac46c766b56c3644d00616168164e656f2e53746f726167652e476574436f6e74657874610b7365636f6e6450686173656c766b51c37e617c680f4e656f2e53746f726167652e4765746c766b54527ac46278000a746869726450686173656c766b52c3876c766b57527ac46c766b57c3644c00616168164e656f2e53746f726167652e476574436f6e74657874610a746869726450686173656c766b51c37e617c680f4e656f2e53746f726167652e4765746c766b54527ac4620f0061006c766b54527ac46203006c766b54c3616c75665cc56b6c766b00527ac46c766b51527ac4616c766b00c3c001149c009c6c766b58527ac46c766b58c3640e00006c766b59527ac462f6006168164e656f2e53746f726167652e476574436f6e746578746c766b51c36c766b00c37e617c680f4e656f2e53746f726167652e4765746c766b52527ac46c766b52c3519f6c766b5a527ac46c766b5ac3640e00006c766b59527ac4629700006c766b53527ac4006c766b54527ac46c766b00c36c766b51c3617c656b016c766b55527ac46c766b00c36c766b51c3617c65b7026c766b56527ac46c766b56c36c766b55c3a06c766b5b527ac46c766b5bc3641c00616c766b56c36c766b55c39403805101966c766b53527ac4616c766b52c36c766b53c39502da02966c766b57527ac46c766b57c36c766b59527ac46203006c766b59c3616c756659c56b6c766b00527ac4616c766b00c3c0519c009c6c766b56527ac46c766b56c3640e00006c766b57527ac462b5006c766b00c300c36c766b51527ac46c766b51c3c001149c009c6c766b58527ac46c766b58c3640e00006c766b57527ac46282006c766b51c3610a66697273745068617365617c6558fe6c766b52527ac46c766b51c3610b7365636f6e645068617365617c653afe6c766b53527ac46c766b51c3610a74686972645068617365617c651dfe6c766b54527ac46c766b52c36c766b53c3936c766b54c3936c766b55527ac46c766b55c36c766b57527ac46203006c766b57c3616c75665ac56b6c766b00527ac46c766b51527ac4616168164e656f2e53746f726167652e476574436f6e746578746c766b00c3106c617374576974686472617754696d657e617c680f4e656f2e53746f726167652e4765746c766b52527ac46c766b51c3610a666972737450686173659c6c766b53527ac46c766b53c3643000616c766b52c3040063325ba16c766b54527ac46c766b54c364110061040063325b6c766b52527ac4616162a3006c766b51c3610b7365636f6e6450686173659c6c766b55527ac46c766b55c3643000616c766b52c30480b4335ba16c766b56527ac46c766b56c3641100610480b4335b6c766b52527ac461616254006c766b51c3610a746869726450686173659c6c766b57527ac46c766b57c3643000616c766b52c3040006355ba16c766b58527ac46c766b58c364110061040006355b6c766b52527ac461616206006161f06c766b52c36c766b59527ac46203006c766b59c3616c75665ac56b6c766b00527ac46c766b51527ac4616168184e656f2e426c6f636b636861696e2e4765744865696768746168184e656f2e426c6f636b636861696e2e4765744865616465726168174e656f2e4865616465722e47657454696d657374616d706c766b52527ac46c766b51c3610a666972737450686173659c6c766b53527ac46c766b53c3643000616c766b52c30400caf45ea06c766b54527ac46c766b54c364110061047f1bf65e6c766b52527ac4616162a3006c766b51c3610b7365636f6e6450686173659c6c766b55527ac46c766b55c3643000616c766b52c304801bf65ea06c766b56527ac46c766b56c36411006104ff6cf75e6c766b52527ac461616254006c766b51c3610a746869726450686173659c6c766b57527ac46c766b57c3643000616c766b52c304006df75ea06c766b58527ac46c766b58c364110061047fbef85e6c766b52527ac461616206006161f06c766b52c36c766b59527ac46203006c766b59c3616c756656c56b6c766b00527ac4616168164e656f2e53746f726167652e476574436f6e74657874610a666972737450686173656c766b00c37e617c680f4e656f2e53746f726167652e4765746c766b51527ac46168164e656f2e53746f726167652e476574436f6e74657874610b7365636f6e6450686173656c766b00c37e617c680f4e656f2e53746f726167652e4765746c766b52527ac46168164e656f2e53746f726167652e476574436f6e74657874610a746869726450686173656c766b00c37e617c680f4e656f2e53746f726167652e4765746c766b53527ac46c766b51c3009c6417006c766b52c3009c640d006c766b53c3009c620400006c766b54527ac46c766b54c3640f0061516c766b55527ac4620e00006c766b55527ac46203006c766b55c3616c7566'
const neohost = 'http://10.137.104.96:10332';

class Airdrop extends React.Component {
  state = {
    projects
  };

  endianChange = (inSmall) => {
    let result = [], num;
    if (inSmall.indexOf("0x") === 0) {
      inSmall = inSmall.slice(2);
    } else if (inSmall) {
      result = ['0x'];
    }
    let smaArray = inSmall.hexToBytes().reverse();
    for (let i = 0; i < smaArray.length; i++) {
      num = smaArray[i];
      if (num < 16) {
        num = smaArray[i].toString(16);
        num = "0" + num;
      } else {
        num = smaArray[i].toString(16);
      }
      result.push(num);
    }
    return result.join("");
  }

  getScriptHash = async (address) => {
    const hash = await window.AntShares.Wallets.Wallet.toScriptHash(address);
    if (address && address.length === 34 && hash) {
      return this.endianChange('0x' + hash.toString());
    } else {
      Notification.open({type: 'warning', message: intl.get('wallet.valid_add')})
    }
  };

  id = () => {
    return moment().format('YYYYMMDDHHmm')
  };
  claimToken = async (project) => {
    if (project.projectId !== 1) {
      Notification.open({type: 'error', message: intl.get('wallet.not_open')});
      return;
    }

    if (project.last && (moment().valueOf() - project.last) <= 60000) {
      Notification.open({type: 'warning', message: intl.get('wallet.claim_too_often')})
      return;
    }

    if (!(project.amount && project.amount > 0)) {
      Notification.open({type: 'warning', message: intl.get('wallet.claim_value_low')})
      return
    }
    const address = project.address;
    const scriptHash = await this.getScriptHash(address);
    if (scriptHash) {
      const params = 'd1013d1c' + this.id()+'0000' + scriptHash + method;
      let body = {};
      body.method = 'sendrawtransaction';
      body.params = [params];
      const res = await request({method: 'post', body}, neohost);
      if (res.result) {
        Notification.open({
          message:intl.get('wallet.claim_token_suc',{token:project.lrx}),
          type:'success',
          actions:(
            <div>
              <Button className="alert-btn mr5" onClick={() =>  window.open(`http://state.otcgo.cn/traninfo.html?id=${res.result.txid}&network=mainnet`,'_blank')}>{intl.get('wallet.neo_bro')}</Button>
            </div>
          )
        });
        project.last = moment().valueOf();
        projects[0] = project;
        this.setState({projects})
      } else {
        Notification.open({type: 'error', message: intl.get('wallet.claim_token_fail',{token:project.lrx}),description:res.error.message})
      }
    }
  };

  componentDidMount() {
    const _this = this;
    mapAsync(projects, async (project, callback) => {
      try{
        let address = await getBindAddress(window.WALLET.getAddress(), project.projectId);
        if (project.projectId === 1) {
          project.claimable = false;
          project.valid = false;
          address = "ALo8qGRjbikQrErXZPJ8wPyiwmTBQ3TAbA";
          const scriptHash = await this.getScriptHash(address);
          if (scriptHash) {
            project.valid = true;
            const params = '14' + scriptHash + '51c1157175657279417661696c61626c6542616c616e63656765ffb17449e971e4a1d96291cc9a3609d013cc05';
            let body = {};
            body.method = 'invokescript';
            body.params = [params];
            const res = await request({method: 'post', body}, neohost);
            if (res.result) {
              project.amount = toNumber(toBig(res.result.stack[0].value).div(1e8));
              project.claimable = true
            }
          }
        }else if(address){
          project.valid = true;
          project.claimable = false
        }
        callback(null, {...project, address})
      }catch (e){
        callback(e)
      }
    }, (err, results) => {
      if(!err){
        _this.setState({projects: results});
      }
    })
  }

  findBindAddress = (project) => {
    const targetProject = this.state.projects.find(pro => pro.projectId === project.projectId);
    return targetProject ? targetProject.address : '';
  };

  render() {
    const {projects} = this.state;
    const neoProject  = projects.find(item => item.projectId ===1);
    const HomePage = ({page}) => {
      return (
        <Card title={intl.get('wallet.airdrop')}>
          {neoProject.claimable && <Alert type="success" closable className="mb10"
                 description={
                   <div>
                     {intl.get('wallet.cur_claim',{token:neoProject.lrx,amount:neoProject.amount})},
                     <a className='color-blue-500 ml5' onClick={() => this.claimToken(neoProject)}>{intl.get('wallet.claim_action',{token:neoProject.lrx})}</a>
                   </div>
                 }/>}
          {this.state.projects.map((project, index) => {
            return (<div className="row zb-b-b pt10 pb10 ml0 mr0 align-items-center" key={index}>
              <div className="col-auto pl0">
                <CoinIcon size="32" color="grey-900"/>
              </div>
              <div className="col pl0 pr0">
                <div className="fs2 color-black-1 font-weight-bold list-inline ">
                  <div className='list-inline-item'>
                    {project.lrx.toUpperCase()}
                  </div>
                  {this.findBindAddress(project) &&
                  <div className='list-inline-item'>
                    <Tooltip title={intl.get('wallet.binding')}>
                      <span>
                        <Icon type="check-circle" className="color-success-1"/>
                      </span>
                    </Tooltip>
                  </div>
                  }
                  {this.findBindAddress(project) && !project.valid &&
                  <div className='fs3 color-black-1 color-error-1 list-inline-item'>
                    {intl.get('wallet.invalid_bind_add',{token:project.lrc})}
                  </div>
                  }
                </div>
                {!this.findBindAddress(project) &&
                <div className="fs2 color-black-3 pl0 pr0">
                  {intl.get('wallet.no_bound')}
                </div>
                }
                {this.findBindAddress(project) &&
                <div className='fs3 color-black-3'>
                  <Tooltip
                    title={intl.get('wallet.bound_address', {token: intl.get(`wallet.${project.name.toLowerCase()}`)})}>
                    {this.findBindAddress(project)}
                  </Tooltip>
                </div>
                }
              </div>
              { false && project.claimable && <div className="col-auto pl0 pr5">
                <div className="f2 ">
                  <a className="color-primary-1"
                     onClick={() => this.claimToken(project)}>{project.amount} {intl.get('wallet.to_claim', {token: project.lrx})}</a>
                </div>
              </div>
              }
              {!this.findBindAddress(project) && <div className="col-auto pr5">
                <div className="f2 color-black-3">
                  <a className="color-primary-1"
                     onClick={page.gotoPage.bind(this, {
                       id: "detail",
                       project: project,
                       onClose: page.gotoPage.bind(this, {id: 'list'})
                     })}>{intl.get('wallet.to_bind_address')}</a>
                </div>
              </div>
              }
              {this.findBindAddress(project) && <div className="col-auto pl0 pr5">
                <div className="f2 ">
                  <a className="color-primary-1"
                     onClick={page.gotoPage.bind(this, {
                       id: "detail",
                       project: project,
                       onClose: page.gotoPage.bind(this, {id: 'list'})
                     })}>{intl.get('wallet.to_edit')}</a>
                </div>
              </div>
              }
              <div className="col-auto pr0 pl0">
                <div className="f2 color-black-3">
                  <i className="icon-loopring icon-loopring-right"/>
                </div>
              </div>
            </div>)
          })}
          <div className="mb25"></div>
        </Card>)
    };
    return (
      <Pages active='list'>
        <Page id='list'>
          <HomePage/>
        </Page>
        <Page id="detail">
          <AirdropBind/>
        </Page>
      </Pages>
    );
  }
}

export default Airdrop
