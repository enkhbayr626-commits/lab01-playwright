оюутан: С. Энхбаяр /b232270153/

# Лаборатори 1 — Playwright

SauceDemo сайтад нэвтрэх болон сагсанд бараа нэмэх үйлдлийг шалгах лаборатори.

## Ажиллуулах

WSL Ubuntu дээр Node.js 22 эсвэл түүнээс шинэ хувилбар суусан байна.

```bash
npm install
npx playwright install --with-deps chromium
npx playwright test
npx playwright show-report
```

## Хийсэн тестүүд

1. `standard_user / secret_sauce` ашиглан нэвтрээд Products гарчиг гарч ирэхийг шалгасан.
2. Буруу нууц үг оруулахад алдааны мэдэгдэл гарч байгааг шалгасан.
3. Sauce Labs Backpack барааг сагсанд нэмээд нэр, тоог нь шалгаж, буцааж устгасан.

Тест бүр шинэ browser context дээр ажилладаг. Нэвтэрсэн тестүүд `afterEach` дотор Logout хийдэг. Буруу нууц үгийн тест нэвтрээгүй учраас Logout хийхгүй, login товч харагдаж байгааг шалгана.

WSL Ubuntu дээр Chromium ашиглан ажиллуулахад **3 тест тэнцсэн**, нийт 16.0 секунд болсон. Сагсны тестийн бичлэг: [cart.webm](evidence/cart.webm).

## Locator

Товч олоход `getByRole`, input олоход `getByPlaceholder`, текст шалгахад `getByText` ашигласан. Сагсны тоо зэрэг нэргүй элементэд CSS class ашигласан. XPath-ийн урт зам нь хуудасны бүтэц өөрчлөгдөхөд эвдэрч болох тул хэрэглээгүй. `toBeVisible`, `toHaveURL`, `toHaveText` ашиглан үр дүнг шалгасан.

## Codegen ба Trace

```bash
npx playwright codegen https://www.saucedemo.com
npx playwright test --trace on
npx playwright show-trace evidence/cart-trace.zip
npx playwright show-trace evidence/failure-trace.zip
```

[Codegen жишээ](evidence/codegen.spec.ts)-г Playwright recorder-оор headless горимд нэвтрэх, гарах үйлдэл бичүүлж гаргасан. Гарсан код үйлдлүүдийг бичсэн боловч үр дүнгийн assertion-ийг өөрөө нэмээгүй. Үндсэн тестэд assertion болон буруу нууц үгийн шалгалтыг нэмсэн.

Санаатай алдааны туршилтаар Products гарчгийг Orders гэж шалгасан. Үр дүнд нь Expected Orders, Received Products гэсэн алдаа гарсан. [Алдааны лог](evidence/failure.txt) болон trace-ийг хадгалсан. Үндсэн 3 тестэд энэ буруу assertion байхгүй.

## Playwright ба Selenium

Playwright дээр товч дарахдаа элемент бэлэн болохыг автоматаар хүлээдэг нь хэрэгтэй санагдсан. Энэ ажилд тусдаа sleep бичих шаардлага гараагүй. Selenium дээр динамик элементэд explicit wait ашиглах нь түгээмэл. Playwright-ийн Codegen үйлдлээс код гаргадаг ч assertion-ийг нэмж бичих хэрэгтэй байв. Trace нь алдаа гарсан алхмыг олоход тусалсан. Selenium Manager бас driver-ийг автоматаар удирддаг тул Selenium бүрд driver-ийг заавал гараар татдаг гэж ойлгож болохгүй. Энэ ажилд зөвхөн Playwright ажиллуулсан учраас Selenium-тэй хурдыг нь хэмжиж харьцуулаагүй.
