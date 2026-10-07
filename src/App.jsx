import { useMemo, useRef, useState } from 'react'
import {
  LayoutDashboard, Package, Tags, ShoppingBag, Store, CreditCard, Settings,
  Search, Bell, ChevronDown, Plus, ArrowUpRight, Clock3, CheckCircle2,
  Truck, ImagePlus, Type, Upload, RotateCcw, Save, Layers3, Shirt,
  SlidersHorizontal, Grid2X2, Heart, X, Menu, Box, Palette, Eye, MoreHorizontal
} from 'lucide-react'

const nav = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Product catalog', icon: Package },
  { id: 'branding', label: 'Branding', icon: Tags },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'stores', label: 'Stores', icon: Store },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings }
]

const products = [
  { id: 1, name: '460GSM Premium Heavyweight Hoodie', category: 'Hoodies', price: 32.80, material: '100% Cotton', sizes: 'XS–3XL', days: '2–4 days', palette: ['#1c1c1c','#d9d4c8','#42504a','#7a1c27'] },
  { id: 2, name: '420GSM Relaxed Wide Leg Sweatpants', category: 'Pants', price: 24.90, material: '100% Cotton', sizes: 'XS–3XL', days: '2–4 days', palette: ['#222','#777','#c6c0b4','#263a57'] },
  { id: 3, name: '280GSM Boxy Long Sleeve', category: 'Long sleeves', price: 15.40, material: '100% Cotton', sizes: 'XS–2XL', days: '2–3 days', palette: ['#111','#eee9df','#5d615e','#6b2131'] },
  { id: 4, name: '240GSM Everyday Mesh Shorts', category: 'Shorts', price: 16.70, material: 'Cotton blend', sizes: 'S–2XL', days: '2–3 days', palette: ['#151515','#f1efe7','#4b596d','#59623d'] },
  { id: 5, name: 'Padded Utility Gilet', category: 'Gilets', price: 29.50, material: 'Recycled nylon', sizes: 'S–2XL', days: '3–5 days', palette: ['#161616','#d3ccbc','#3f493d'] },
  { id: 6, name: 'Premium Quilted Bodywarmer', category: 'Bodywarmers', price: 34.20, material: 'Recycled polyester', sizes: 'S–3XL', days: '3–5 days', palette: ['#101010','#d8d0c2','#2b3b4f','#4f4439'] },
  { id: 7, name: '550GSM Studio Zip Hoodie', category: 'Hoodies', price: 39.95, material: 'French terry cotton', sizes: 'XS–3XL', days: '3–5 days', palette: ['#111','#c7c1b7','#3c4654'] },
  { id: 8, name: '320GSM Carpenter Pants', category: 'Pants', price: 28.60, material: 'Cotton canvas', sizes: '28–38', days: '3–5 days', palette: ['#292824','#bcb29e','#455055'] }
]

const recentOrders = [
  { id: '#COD-1048', customer: 'NOVA Studio', item: '24 × Heavyweight Hoodie', total: '€1,132.80', status: 'In production' },
  { id: '#COD-1047', customer: 'District 11', item: '12 × Quilted Bodywarmer', total: '€684.00', status: 'Shipped' },
  { id: '#COD-1046', customer: 'FWD Atelier', item: '30 × Boxy Long Sleeve', total: '€912.00', status: 'Delivered' },
  { id: '#COD-1045', customer: 'Ninetynine', item: '18 × Wide Leg Pants', total: '€754.20', status: 'In production' }
]

function Logo() {
  return <div className="brand-mark">
    <span>C</span><span>O</span><span>D</span><strong>PARTNERS</strong>
  </div>
}

function ProductIllustration({ category }) {
  const common = { fill: 'currentColor', stroke: 'rgba(0,0,0,.12)', strokeWidth: 1.5 }
  if (category === 'Pants') return <svg viewBox="0 0 220 220" className="product-svg"><path {...common} d="M74 25h72l8 60-18 110H98l12-92-10 92H62L66 85z"/><path d="M110 27v72" stroke="rgba(255,255,255,.18)" strokeWidth="2"/></svg>
  if (category === 'Shorts') return <svg viewBox="0 0 220 220" className="product-svg"><path {...common} d="M68 42h84l4 42-16 84-32-8-2-55-4 55-32 8-10-84z"/><path d="M110 44v63" stroke="rgba(255,255,255,.18)" strokeWidth="2"/></svg>
  if (category === 'Gilets' || category === 'Bodywarmers') return <svg viewBox="0 0 220 220" className="product-svg"><path {...common} d="M79 29l31 17 31-17 19 23-11 28-2 103H73L71 80 60 52z"/><path d="M110 46v137M78 86h64M76 116h68M75 146h70" stroke="rgba(255,255,255,.18)" strokeWidth="2"/></svg>
  if (category === 'Long sleeves') return <svg viewBox="0 0 220 220" className="product-svg"><path {...common} d="M79 34l31 14 31-14 39 31-19 25-17-13 3 106H73l3-106-17 13-19-25z"/><path d="M96 42c4 11 24 11 28 0" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="3"/></svg>
  return <svg viewBox="0 0 220 220" className="product-svg"><path {...common} d="M85 40c4-23 46-23 50 0l29 20-13 31-12-8 6 100H75l6-100-12 8-13-31z"/><path {...common} d="M87 43c8-15 38-15 46 0l-23 25z"/><path d="M91 142h38l8 27H83z" fill="rgba(255,255,255,.08)"/></svg>
}

function Sidebar({ page, setPage, open, setOpen }) {
  return <aside className={'sidebar ' + (open ? 'mobile-open' : '')}>
    <div className="side-head">
      <Logo/>
      <button className="icon-btn close-side" onClick={() => setOpen(false)}><X size={18}/></button>
    </div>
    <div className="side-section-title">Workspace</div>
    <nav>
      {nav.map(item => {
        const Icon = item.icon
        return <button key={item.id} className={page === item.id ? 'nav-item active' : 'nav-item'} onClick={() => { setPage(item.id); setOpen(false) }}>
          <Icon size={18}/><span>{item.label}</span>{item.id === 'orders' && <em>8</em>}
        </button>
      })}
    </nav>

    <div className="side-card">
      <div className="side-card-icon"><Truck size={18}/></div>
      <strong>Ship on Demand</strong>
      <p>We print, pack and ship directly to your customer.</p>
      <button onClick={() => setPage('products')}>Browse products <ArrowUpRight size={14}/></button>
    </div>

    <div className="user-mini">
      <div className="avatar">Z</div>
      <div><strong>ZextyFL</strong><span>Brand owner</span></div>
      <MoreHorizontal size={18}/>
    </div>
  </aside>
}

function Header({ title, onMenu }) {
  return <header className="topbar">
    <div className="top-title">
      <button className="icon-btn menu-mobile" onClick={onMenu}><Menu size={20}/></button>
      <div><h1>{title}</h1><p>Clothing dropshipping & on-demand production</p></div>
    </div>
    <div className="top-actions">
      <button className="search-pill"><Search size={17}/><span>Search anything</span><kbd>⌘K</kbd></button>
      <button className="icon-btn"><Bell size={19}/><i/></button>
      <button className="profile-pill"><span className="avatar small">Z</span><span>USD</span><ChevronDown size={15}/></button>
    </div>
  </header>
}

function Metric({ label, value, change, icon: Icon }) {
  return <div className="metric-card">
    <div className="metric-top"><span>{label}</span><div className="metric-icon"><Icon size={18}/></div></div>
    <div className="metric-value">{value}</div>
    <div className="metric-foot"><strong>{change}</strong><span> vs last month</span></div>
  </div>
}

function Status({ value }) {
  const cls = value.toLowerCase().replaceAll(' ', '-')
  return <span className={'status ' + cls}><i/>{value}</span>
}

function Dashboard({ setPage }) {
  return <div className="page-wrap">
    <section className="hero-strip">
      <div>
        <span className="eyebrow">COD PARTNERS</span>
        <h2>Your clothing brand, without the inventory.</h2>
        <p>Design products, add custom branding and ship every order on demand.</p>
        <div className="hero-actions">
          <button className="primary" onClick={() => setPage('products')}><Plus size={17}/> Create product</button>
          <button className="ghost" onClick={() => setPage('branding')}>Setup branding</button>
        </div>
      </div>
      <div className="hero-art">
        <div className="mini-box box-a"><Shirt/></div>
        <div className="mini-box box-b"><Tags/></div>
        <div className="mini-box box-c"><Truck/></div>
      </div>
    </section>

    <div className="metric-grid">
      <Metric label="Revenue" value="€12,846" change="+18.4%" icon={CreditCard}/>
      <Metric label="Orders" value="184" change="+12.1%" icon={ShoppingBag}/>
      <Metric label="In production" value="26" change="+6.8%" icon={Clock3}/>
      <Metric label="Delivered" value="142" change="+21.5%" icon={CheckCircle2}/>
    </div>

    <div className="dashboard-grid">
      <section className="panel grow">
        <div className="panel-head">
          <div><h3>Recent orders</h3><p>Track your latest on-demand orders.</p></div>
          <button className="text-btn" onClick={() => setPage('orders')}>View all <ArrowUpRight size={14}/></button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>{recentOrders.map(o => <tr key={o.id}><td><strong>{o.id}</strong></td><td>{o.customer}</td><td>{o.item}</td><td>{o.total}</td><td><Status value={o.status}/></td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="panel activity">
        <div className="panel-head"><div><h3>Production flow</h3><p>Current fulfillment queue.</p></div></div>
        <div className="flow-item"><span className="flow-dot active"/><div><strong>26</strong><p>In production</p></div><b>14%</b></div>
        <div className="flow-line"><i style={{ width: '14%' }}/></div>
        <div className="flow-item"><span className="flow-dot"/><div><strong>16</strong><p>Quality check</p></div><b>9%</b></div>
        <div className="flow-line"><i style={{ width: '9%' }}/></div>
        <div className="flow-item"><span className="flow-dot"/><div><strong>11</strong><p>Ready to ship</p></div><b>6%</b></div>
        <div className="flow-line"><i style={{ width: '6%' }}/></div>
        <div className="mini-stat"><Truck size={19}/><div><strong>2.8 days</strong><span>Avg. production time</span></div></div>
      </section>
    </div>
  </div>
}

const cats = ['All products','Pants','Shorts','Long sleeves','Hoodies','Gilets','Bodywarmers']

function ProductCatalog() {
  const [category, setCategory] = useState('All products')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('Popular')
  const [fav, setFav] = useState([])

  const filtered = useMemo(() => {
    let p = products.filter(x => (category === 'All products' || x.category === category) && x.name.toLowerCase().includes(query.toLowerCase()))
    if (sort === 'Price low') p = [...p].sort((a,b) => a.price - b.price)
    if (sort === 'Price high') p = [...p].sort((a,b) => b.price - a.price)
    return p
  }, [category, query, sort])

  return <div className="page-wrap">
    <div className="catalog-head">
      <div>
        <span className="eyebrow">PRODUCT CATALOG</span>
        <h2>Build your next collection.</h2>
        <p>Premium blanks ready for DTG, embroidery, custom labels and on-demand shipping.</p>
      </div>
      <button className="primary"><Plus size={17}/> New custom product</button>
    </div>

    <div className="catalog-layout">
      <aside className="filter-card">
        <div className="filter-title"><SlidersHorizontal size={17}/><strong>Categories</strong></div>
        {cats.map(c => <button key={c} className={category === c ? 'filter-link active' : 'filter-link'} onClick={() => setCategory(c)}>
          <span>{c}</span><em>{c === 'All products' ? products.length : products.filter(p => p.category === c).length}</em>
        </button>)}
        <div className="filter-divider"/>
        <div className="filter-title"><Palette size={17}/><strong>Decoration</strong></div>
        {['DTG print','Embroidery','Neck label','Packaging bag'].map(x => <label className="check-row" key={x}><input type="checkbox"/><span>{x}</span></label>)}
      </aside>

      <main>
        <div className="catalog-tools">
          <div className="search-field"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search blanks, fits and fabrics..."/></div>
          <div className="select-wrap"><select value={sort} onChange={e => setSort(e.target.value)}><option>Popular</option><option>Price low</option><option>Price high</option></select><ChevronDown size={15}/></div>
          <button className="view-btn active"><Grid2X2 size={17}/></button>
        </div>

        <div className="product-grid">
          {filtered.map(p => <article className="product-card" key={p.id}>
            <div className="product-visual">
              <span className="product-chip">{p.category}</span>
              <button className={fav.includes(p.id) ? 'heart active' : 'heart'} onClick={() => setFav(f => f.includes(p.id) ? f.filter(x => x !== p.id) : [...f, p.id])}><Heart size={17}/></button>
              <div className="art-color"><ProductIllustration category={p.category}/></div>
              <button className="quick-view"><Eye size={16}/> Quick view</button>
            </div>
            <div className="product-info">
              <span className="material">{p.material}</span>
              <h3>{p.name}</h3>
              <div className="product-meta"><strong>From €{p.price.toFixed(2)}</strong><span>{p.sizes}</span></div>
              <div className="swatches">{p.palette.map((c,i) => <i key={i} style={{ background: c }}/>)}</div>
              <div className="turnaround"><Clock3 size={14}/> Production: {p.days}</div>
            </div>
          </article>)}
        </div>
      </main>
    </div>
  </div>
}

function uploadImage(e, setSide) {
  const file = e.target.files && e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = ev => setSide(prev => ({ ...prev, image: ev.target.result }))
  reader.readAsDataURL(file)
}

function BrandingPreview({ type, sideData }) {
  const content = <>
    {sideData.image && <img src={sideData.image} alt="uploaded artwork"/>}
    <span className="design-text" style={{ color: sideData.textColor, fontSize: sideData.fontSize + 'px' }}>{sideData.text}</span>
    {!sideData.image && !sideData.text && <div className="empty-art"><ImagePlus size={26}/><span>Add artwork</span></div>}
  </>

  if (type === 'bag') return <div className="bag-stage">
    <div className="bag-preview" style={{ background: sideData.bg }}>
      <div className="zip-line"><i/><i/></div><div className="print-area">{content}</div><span className="air-hole"/>
    </div>
  </div>

  if (type === 'hangtag') return <div className="tag-stage">
    <div className="hangtag-preview" style={{ background: sideData.bg }}>
      <span className="tag-hole"/><div className="tag-print">{content}</div>
    </div>
  </div>

  return <div className="label-stage"><div className="neck-label-preview" style={{ background: sideData.bg }}>{content}</div></div>
}

function BrandingEditor({ type }) {
  const defaults = type === 'bag'
    ? { bg:'#f8f8f6', text:'', textColor:'#111111', fontSize:30, image:null }
    : { bg:'#111111', text:'', textColor:'#ffffff', fontSize:28, image:null }

  const [side, setSide] = useState('front')
  const [front, setFront] = useState(defaults)
  const [back, setBack] = useState({ ...defaults })
  const [saved, setSaved] = useState(false)
  const inputRef = useRef()

  const current = side === 'front' ? front : back
  const setter = side === 'front' ? setFront : setBack
  const name = type === 'bag' ? 'Custom packaging bag' : type === 'hangtag' ? 'Custom hang tag' : 'Custom neck label'

  const save = () => {
    localStorage.setItem('cod-' + type + '-design', JSON.stringify({ front, back }))
    setSaved(true)
    setTimeout(() => setSaved(false), 1600)
  }

  return <div className="editor-shell">
    <div className="editor-top">
      <div><span className="eyebrow">DESIGN STUDIO</span><h2>{name}</h2><p>Create both sides and save the branding preset for future products.</p></div>
      <div className="editor-actions">
        <button className="ghost" onClick={() => { setFront(defaults); setBack({ ...defaults }) }}><RotateCcw size={16}/> Reset</button>
        <button className="primary" onClick={save}><Save size={16}/>{saved ? 'Saved' : 'Save design'}</button>
      </div>
    </div>

    <div className="designer-grid">
      <div className="design-canvas">
        <div className="side-toggle">
          <button className={side === 'front' ? 'active' : ''} onClick={() => setSide('front')}>Front</button>
          <button className={side === 'back' ? 'active' : ''} onClick={() => setSide('back')}>Back</button>
        </div>
        <BrandingPreview type={type} sideData={current}/>
        <div className="canvas-note">Safe print area is shown inside the product preview.</div>
      </div>

      <aside className="tool-panel">
        <div className="tool-head"><h3>Customize {side}</h3><span>{side === 'front' ? '01' : '02'}</span></div>

        <div className="tool-section">
          <label>Artwork</label>
          <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/svg+xml" hidden onChange={e => uploadImage(e, setter)}/>
          <button className="upload-btn" onClick={() => inputRef.current && inputRef.current.click()}>
            <Upload size={18}/>
            <div><strong>{current.image ? 'Replace artwork' : 'Upload artwork'}</strong><span>PNG, JPG or SVG · max 20MB</span></div>
          </button>
          {current.image && <button className="remove-art" onClick={() => setter(p => ({ ...p, image:null }))}>Remove artwork</button>}
        </div>

        <div className="tool-section">
          <label>Text</label>
          <div className="input-icon"><Type size={16}/><input value={current.text} onChange={e => setter(p => ({ ...p, text:e.target.value }))} placeholder="Add brand name or message"/></div>
        </div>

        <div className="tool-row">
          <div className="tool-section compact"><label>Text color</label><input className="color-input" type="color" value={current.textColor} onChange={e => setter(p => ({ ...p, textColor:e.target.value }))}/></div>
          <div className="tool-section compact"><label>Background</label><input className="color-input" type="color" value={current.bg} onChange={e => setter(p => ({ ...p, bg:e.target.value }))}/></div>
        </div>

        <div className="tool-section">
          <label>Text size <b>{current.fontSize}px</b></label>
          <input type="range" min="14" max="54" value={current.fontSize} onChange={e => setter(p => ({ ...p, fontSize:Number(e.target.value) }))}/>
        </div>

        <div className="requirements"><strong>Print file requirements</strong><p>High resolution artwork · RGB/CMYK · transparent PNG recommended.</p></div>
      </aside>
    </div>
  </div>
}

function Branding() {
  const [tab, setTab] = useState('label')
  return <div className="page-wrap">
    <div className="branding-tabs">
      <button className={tab === 'label' ? 'active' : ''} onClick={() => setTab('label')}><Layers3 size={17}/><span>Neck labels</span></button>
      <button className={tab === 'bag' ? 'active' : ''} onClick={() => setTab('bag')}><ShoppingBag size={17}/><span>Packaging bags</span></button>
      <button className={tab === 'hangtag' ? 'active' : ''} onClick={() => setTab('hangtag')}><Tags size={17}/><span>Hang tags</span></button>
    </div>
    <BrandingEditor key={tab} type={tab}/>
  </div>
}

function Orders() {
  const rows = [
    ...recentOrders,
    { id:'#COD-1044', customer:'Archetype', item:'9 × Utility Gilet', total:'€486.00', status:'Delivered' },
    { id:'#COD-1043', customer:'Noir Archive', item:'20 × Mesh Shorts', total:'€598.00', status:'Shipped' }
  ]
  return <div className="page-wrap">
    <div className="simple-head">
      <div><span className="eyebrow">FULFILLMENT</span><h2>Orders</h2><p>Everything currently moving through production and shipping.</p></div>
      <button className="primary"><Plus size={17}/> Manual order</button>
    </div>
    <section className="panel">
      <div className="panel-head"><div><h3>All orders</h3><p>{rows.length} orders shown</p></div><div className="search-field small"><Search size={16}/><input placeholder="Search order..."/></div></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>{rows.map(o => <tr key={o.id}><td><strong>{o.id}</strong></td><td>{o.customer}</td><td>{o.item}</td><td>{o.total}</td><td><Status value={o.status}/></td></tr>)}</tbody>
        </table>
      </div>
    </section>
  </div>
}

function Placeholder({ page, setPage }) {
  const labels = { stores:'Connected stores', billing:'Billing & payouts', settings:'Workspace settings' }
  return <div className="page-wrap">
    <section className="empty-page">
      <div className="empty-icon"><Box size={30}/></div>
      <span className="eyebrow">COD PARTNERS</span>
      <h2>{labels[page]}</h2>
      <p>This section is ready for your live integrations. The core catalog, custom branding studio and fulfillment dashboard are already built.</p>
      <button className="primary" onClick={() => setPage('products')}>Open product catalog <ArrowUpRight size={16}/></button>
    </section>
  </div>
}

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [mobile, setMobile] = useState(false)
  const current = (nav.find(x => x.id === page) || {}).label || 'Dashboard'

  return <div className="app-shell">
    <Sidebar page={page} setPage={setPage} open={mobile} setOpen={setMobile}/>
    {mobile && <button className="mobile-backdrop" onClick={() => setMobile(false)}/>}
    <div className="main-shell">
      <Header title={current} onMenu={() => setMobile(true)}/>
      <main className="content">
        {page === 'dashboard' && <Dashboard setPage={setPage}/>}
        {page === 'products' && <ProductCatalog/>}
        {page === 'branding' && <Branding/>}
        {page === 'orders' && <Orders/>}
        {['stores','billing','settings'].includes(page) && <Placeholder page={page} setPage={setPage}/>}
      </main>
    </div>
  </div>
}
