import React from 'react'
import type { Metadata, PageProps } from 'next'
import Link from 'next/link'
import data from '@/data/prizeData.json'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const title =
    params.lang === 'vi' ? 'Thể lệ cuộc thi | Cuộc thi vẽ tranh cùng AI' : 'Competition Rules | The SIU AI Art Contest'
  return {
    title: title,
    description: title
  }
}

export default async function RegistrationGuidelinePage({ params }: PageProps) {
  return (
    <div className='w-full px-1 text-justify'>
      {params.lang === 'vi' ? (
        <div className='max-w-4xl mx-auto py-10 space-y-6'>
          <h1 className='text-3xl font-bold text-red-500 text-center'>THỂ LỆ CUỘC THI</h1>
          <h2 className='text-2xl font-bold mb-6'>1. Thể lệ công bố với thí sinh</h2>
          <div className='max-w-4xl mx-auto my-8 px-4'>
            <h2 className='text-xl font-bold mb-6'>Đối tượng dự thi</h2>
            <p>
              <strong>Bảng A:</strong> Học sinh Trung Học Phổ Thông trên cả nước.
            </p>
            <p>
              <strong>Bảng B:</strong> Học sinh Trung Học Cơ Sở trên cả nước
            </p>

            <h2 className='text-xl font-bold mt-8 mb-6'>Thể lệ đăng ký</h2>
            <div>
              Để tham gia cuộc thi, thí sinh đăng ký tài khoản{' '}
              <Link className='underline' href={`/${params.lang}/register`}>
                tại đây.
              </Link>
            </div>
            <p>Mọi thắc mắc vui lòng gửi email về địa chỉ aiart@siu.edu.vn.</p>

            <h2 className='text-xl font-bold mt-8 mb-6'>Thể lệ thi: Cuộc thi gồm hai vòng thi như sau:</h2>

            <div className='px-2 text-justify'>
              <h3 className='text-xl font-bold mb-4'>Vòng sơ loại</h3>
              <p>
                Trong vòng này, các thí sinh được sử dụng phần mềm AI để hiện thực hóa ý tưởng tạo thành các bức tranh
                kỹ thuật số dựa trên chủ đề được nhận từ ban tổ chức. Các thí sinh được tự do lựa chọn phần mềm để hiện
                thực hoá các tác phẩm của mình. Bên dưới là thông tin một số phần mềm miễn phí các thí sinh có thể tham
                khảo sử dụng:
              </p>
              <div className='w-full mx-auto my-8'>
                <table className='w-full border rounded-lg overflow-hidden'>
                  <thead className='bg-gray-800 text-white'>
                    <tr>
                      <th className='py-2 px-4'>STT</th>
                      <th className='py-2 px-4'>Tên phần mềm</th>
                      <th className='py-2 px-4'>Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody className='bg-gray-100'>
                    <tr>
                      <td className='py-2 px-4'>1</td>
                      <td className='py-2 px-4'>Stable Diffusion</td>
                      <td className='py-2 px-4'>Miễn phí và không giới hạn.</td>
                    </tr>
                    <tr>
                      <td className='py-2 px-4'>2</td>
                      <td className='py-2 px-4'>Adobe Firefly</td>
                      <td className='py-2 px-4'>Miễn phí</td>
                    </tr>
                    <tr>
                      <td className='py-2 px-4'>3</td>
                      <td className='py-2 px-4'>Bing Image Creator</td>
                      <td className='py-2 px-4'>Miễn phí và không giới hạn.</td>
                    </tr>
                    <tr>
                      <td className='py-2 px-4'>4</td>
                      <td className='py-2 px-4'>Starry AI</td>
                      <td className='py-2 px-4'>Tối đa 25 ảnh mỗi ngày</td>
                    </tr>
                    <tr>
                      <td className='py-2 px-4'>5</td>
                      <td className='py-2 px-4'>Night Cafe</td>
                      <td className='py-2 px-4'>Mỗi ngày nhận 5 credits, dùng credits để tạo ảnh.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>Ban giám khảo sẽ lựa chọn 10 thí sinh xuất sắc nhất từ mỗi bảng để tiến vào vòng chung kết.</p>

              <h3 className='text-xl font-bold mt-6 mb-4'>Vòng chung kết</h3>
              <p>
                Đối với vòng chung kết, các thí sinh sẽ tham gia thi trực tiếp tại Trường Đại học Tư thục Quốc tế Sài
                Gòn (Số 18 Tống Hữu Định, phường Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh). Trong vòng này, các thí sinh
                chỉ sử dụng phần mềm Mid Journey để sáng tạo các tác phẩm kỹ thuật số, đồng thời các thí sinh được yêu
                cầu thuyết trình về ý nghĩa và thông điệp mà tác phẩm muốn truyền tải trong thời gian không quá 5 phút.
                Ban tổ chức sẽ cung cấp tài khoản Mid Journey để các thí sinh sử dụng trong vòng chung kết. Kết quả sẽ
                được tính dựa trên tác phẩm và phần thuyết trình của các thí sinh{' '}
                <Link className='underline' href={`/${params.lang}/huong-dan-nop-bai`}>
                  tại đây
                </Link>
              </p>

              {/* <h2 className='text-xl font-bold mt-8 mb-6'>Tác phẩm của thí sinh thuộc một trong các chủ để sau: </h2>

              <div className='flex'>
                <div className='flex flex-col justify-start items-start'>
                  <ol className='list-disc pl-6'>
                    <li>Chủ đề 1: Trường học.</li>
                    <li>Chủ đề 2: Quê hương tôi.</li>
                    <li>Chủ đề 3: Hành tinh xanh.</li>
                    <li>Chủ đề 4: Đô thị thông minh.</li>
                    <li>Chủ đề 5: Xã hội tương lai.</li>
                  </ol>
                </div>
              </div> */}
            </div>
          </div>
          <h2 className='text-2xl font-bold mb-6'>2. Cơ cấu giải thưởng</h2>
          <h3 className='text-xl font-medium text-center'>{data.vi.highSchoolStudent.heading}</h3>
          {data.vi.highSchoolStudent.description.map((item, index) => (
            <div key={index}>
              <div className='max-w-4xl mx-auto my-8'>
                <ul className='list-disc pl-6 mb-6'>
                  <li>
                    <span className='font-bold'>{item.title}</span>: {item.content}
                  </li>
                </ul>
              </div>
            </div>
          ))}
          <span>{data.vi.middleSchoolStudent.note}</span>
          <h3 className='text-xl font-medium text-center'>{data.vi.middleSchoolStudent.heading}</h3>
          {data.vi.middleSchoolStudent.description.map((item, index) => (
            <div key={index}>
              <div className='max-w-4xl mx-auto my-8'>
                <ul className='list-disc pl-6 mb-6'>
                  <li>
                    <span className='font-bold'>{item.title}</span>: {item.content}
                  </li>
                </ul>
              </div>
            </div>
          ))}
          <span>{data.vi.middleSchoolStudent.note}</span>
          <h2 className='text-xl font-medium underline mb-6'>
            <strong>{data.vi.attention.content.heading}</strong>
          </h2>
          {data.vi.attention.content.description.map((item, index) => (
            <div key={index}>
              <div className='max-w-4xl mx-auto my-8'>
                <ul className='list-disc pl-6 mb-6'>
                  <li>
                    <span className='font-medium'>{item.content}</span>
                    {item.description &&
                      item.description.map((item, index) => (
                        <ul key={index} className='list-disc pl-6 mb-6'>
                          <li>{item}</li>
                        </ul>
                      ))}
                  </li>
                </ul>
              </div>
            </div>
          ))}
          <span className='font-medium'>{data.vi.attention.note.title}</span>: {data.vi.attention.note.description}
        </div>
      ) : (
        <div className='w-full'>
          <div className='max-w-4xl mx-auto py-10 space-y-6'>
            <h1 className='text-3xl font-bold text-red-500 text-center'>COMPETITION RULES</h1>
            <h2 className='text-2xl font-bold mb-6'>1. Announcement Guidelines for Participants</h2>
            <div className='max-w-4xl mx-auto my-8 px-4'>
              <h2 className='text-xl font-bold mb-6'>Eligibility</h2>
              <p>
                <strong>Group A:</strong> High school students nationwide.
              </p>
              <p>
                <strong>Group B:</strong> Secondary school students nationwide.
              </p>
              <h2 className='text-xl font-bold mt-8 mb-6'>Registration Guidelines</h2>
              <div>
                To participate in the competition, participants should register for an account{' '}
                <Link className='underline' href={`/${params.lang}/register`}>
                  here.
                </Link>
              </div>
              <div>
                If you have any questions, please send an email to the following address: <p>aiart@siu.edu.vn</p>
              </div>

              <h2 className='text-xl font-bold mt-8 mb-6'>
                Competition Rules: The competition consists of two rounds as follows:
              </h2>

              <div className='px-2 text-justify'>
                <h3 className='text-xl font-bold mb-4'>Preliminary Round</h3>
                <p>
                  In this round, participants use AI software to bring their ideas to life and create digital paintings
                  based on themes provided by the organizers. Participants are free to choose the software to realize
                  their artworks. Below is information on some free software that participants can consider using:
                </p>
                <div className='w-full mx-auto my-8'>
                  <table className='w-full border rounded-lg overflow-hidden'>
                    <thead className='bg-gray-800 text-white'>
                      <tr>
                        <th className='py-2 px-4'>No.</th>
                        <th className='py-2 px-4'>Software Name</th>
                        <th className='py-2 px-4'>Note</th>
                      </tr>
                    </thead>
                    <tbody className='bg-gray-100'>
                      <tr>
                        <td className='py-2 px-4'>1</td>
                        <td className='py-2 px-4'>Stable Diffusion</td>
                        <td className='py-2 px-4'>Free and unlimited.</td>
                      </tr>
                      <tr>
                        <td className='py-2 px-4'>2</td>
                        <td className='py-2 px-4'>Adobe Firefly</td>
                        <td className='py-2 px-4'>Free.</td>
                      </tr>
                      <tr>
                        <td className='py-2 px-4'>3</td>
                        <td className='py-2 px-4'>Bing Image Creator</td>
                        <td className='py-2 px-4'>Free and unlimited.</td>
                      </tr>
                      <tr>
                        <td className='py-2 px-4'>4</td>
                        <td className='py-2 px-4'>Starry AI</td>
                        <td className='py-2 px-4'>Up to 25 images per day.</td>
                      </tr>
                      <tr>
                        <td className='py-2 px-4'>5</td>
                        <td className='py-2 px-4'>Night Cafe</td>
                        <td className='py-2 px-4'>Receive 5 credits daily, use credits to create images.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  The judging panel will select the top 10 outstanding contestants from each group to advance to the
                  finals.
                </p>

                <h3 className='text-xl font-bold mt-6 mb-4'>Final Round</h3>
                <p>
                  For the final round, contestants will participate in live competitions at the Saigon International
                  Private University (18 Tong Huu Dinh, Thao Dien Ward, Thu Duc City, Ho Chi Minh City). In this round,
                  participants will exclusively use the Mid Journey software to create digital artworks, and they are
                  required to present the meaning and message of their work within a maximum of 5 minutes. The
                  organizing committee will provide Mid Journey accounts for contestants to use during the final round.
                  Results will be based on the artworks and presentations given by the contestants{' '}
                  <Link className='underline' href={`/${params.lang}/submission-guide`}>
                    here
                  </Link>
                  .
                </p>

                {/* <h2 className='text-xl font-bold mt-8 mb-6'>
                  The works of the contestants fall under one of the following themes:
                </h2>

                <div className='flex'>
                  <div className='flex flex-col items-start'>
                    <ol className='list-disc pl-6'>
                      <li>Theme 1: School.</li>
                      <li>Theme 2: My Homeland.</li>
                      <li>Theme 3: Green Planet.</li>
                      <li>Theme 4: Smart City.</li>
                      <li>Theme 5: Future Society.</li>
                    </ol>
                  </div>
                </div> */}
              </div>
            </div>
            <h2 className='text-2xl font-bold mb-6'>2. Prizes pool</h2>
            <h3 className='text-xl font-medium text-center'>{data.en.highSchoolStudent.heading}</h3>
            {data.en.highSchoolStudent.description.map((item, index) => (
              <div key={index}>
                <div className='max-w-4xl mx-auto my-8'>
                  <ul className='list-disc pl-6 mb-6'>
                    <li>
                      <span className='font-bold'>{item.title}</span>: {item.content}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
            <span>{data.en.middleSchoolStudent.note}</span>
            <h3 className='text-xl font-medium text-center'>{data.en.middleSchoolStudent.heading}</h3>
            {data.en.middleSchoolStudent.description.map((item, index) => (
              <div key={index}>
                <div className='max-w-4xl mx-auto my-8'>
                  <ul className='list-disc pl-6 mb-6'>
                    <li>
                      <span className='font-bold'>{item.title}</span>: {item.content}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
            <span>{data.en.middleSchoolStudent.note}</span>
            <h2 className='text-xl font-medium underline mb-6'>
              <strong>{data.en.attention.content.heading}</strong>
            </h2>
            {data.en.attention.content.description.map((item, index) => (
              <div key={index}>
                <div className='max-w-4xl mx-auto my-8'>
                  <ul className='list-disc pl-6 mb-6'>
                    <li>
                      <span className='font-medium'>{item.content}</span>
                      {item.description &&
                        item.description.map((item, index) => (
                          <ul key={index} className='list-disc pl-6 mb-6'>
                            <li>{item}</li>
                          </ul>
                        ))}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
            <span className='font-medium'>{data.en.attention.note.title}</span>: {data.en.attention.note.description}
          </div>
        </div>
      )}
    </div>
  )
}
