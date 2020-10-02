// Copyright 2019-2020 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useContext } from 'react';
import styled from 'styled-components';
import { delMetadata } from '../../messaging';

import { AccountContext } from '../../components';
import useTranslation from '../../hooks/useTranslation';
import { Header } from '../../partials';
import AccountsTree from './AccountsTree';
import AddAccount from './AddAccount';

export default function Accounts (): React.ReactElement {
  const { t } = useTranslation();
  const { hierarchy } = useContext(AccountContext);

  const _deleteSubMeta = () => {
    delMetadata('0x0bd72c1c305172e1275278aaeb3f161e02eccb7a819e63f62d47bd53a28189f8').catch((e) => console.error(e));
  };

  return (
    <>
      {(hierarchy.length === 0)
        ? <AddAccount />
        : (
          <>
            <Header
              showAdd
              showSettings
              text={t<string>('Accounts')}
            />
            <AccountsArea>
              <div className='link'
                onClick={_deleteSubMeta}>Delete Subsocial metadata</div>
              {hierarchy.map((json, index): React.ReactNode => (
                <AccountsTree
                  {...json}
                  key={`${index}:${json.address}`}
                />
              ))}
            </AccountsArea>
          </>
        )
      }
    </>
  );
}

const AccountsArea = styled.div`
  height: 100%;
  overflow-y: scroll;
  margin-top: -25px;
  padding-top: 25px;
  scrollbar-width: none;

  .link{
    cursor: pointer;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
