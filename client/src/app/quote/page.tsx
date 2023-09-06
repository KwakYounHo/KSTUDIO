import type { Metadata } from 'next';
import type { FC } from 'react';
import { constants } from '@/app/common/domain/models/constants'
import { options } from '@/app/quote/Adapter/requestHeader'
import DatabaseResult from '@/components/Quote/DatabaseResult';


const metadata:Metadata = {
  title: constants.createTitle('Quote')
}

const Quote: FC = async () => {
  const request = await fetch('https://api.notion.com/v1/databases/1fb19a3cab714c2980742721fd943358/query', options)
  const jsonData = await request.json()
  const resp = jsonData;

  return (
    <div id="main">
      <div className={'grid grid-cols-1 md:grid-cols-2 gap-7 mt-7'}>
        {resp.results.map((element:any) => {
          const id = element.id;
          const createdArray = element.created_time.split('T');
          const created = [createdArray[0], createdArray[1].split('.')[0].substr(0,5)];
          console.log([createdArray[0], createdArray[1].split('.')[0].substr(0,5)]);
          const cover = element.cover.external.url;
          const tag = element.properties['태그'].multi_select[0].name;
          const date = element.properties['날짜'].date.start.substr(0,10);
          const description = element.properties['\b설명'].rich_text[0].text.content;
          const title = element.properties['이름'].title[0].text.content;

          return <DatabaseResult key={id} created={created} ImageSrc={cover} tag={tag} date={date} description={description} title={title} />
        })}
      </div>
    </div>
  )
}

export default Quote;